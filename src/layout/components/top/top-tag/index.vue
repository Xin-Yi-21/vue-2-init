<template>
  <div id="tags-view-container" class="top-tag-vue">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link ref="tag" v-for="tag in visitedViews" :key="tag.path"
        :class="['tags-view-item', isActive(tag) ? 'active' : '']"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        :style="activeStyle(tag)"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)">
        <span class="tag-title"> {{ tag.title }}</span>
        <span v-if="!isAffix(tag)" class="el-icon-close tag-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        <i class="el-icon-refresh-right"></i>
        <span class="operate-text">刷新页面</span>
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <i class="el-icon-close"></i>
        <span class="operate-text">关闭当前</span>
      </li>
      <li @click="closeOthersTags">
        <i class="el-icon-circle-close"></i>
        <span class="operate-text">关闭其他</span>
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <i class="el-icon-back"></i>
        <span class="operate-text">关闭左侧</span>
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <i class="el-icon-right"></i>
        <span class="operate-text">关闭右侧</span>
      </li>
      <li @click="closeAllTags(selectedTag)">
        <i class="el-icon-circle-close"></i>
        <span class="operate-text">全部关闭</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './components/scroll-pane'
import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tag.visitedViews
    },
    routes() {
      return this.$store.state.menu.routes
    },
    theme() {
      return this.$store.state.setting.themeColor
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    activeStyle(tag) {
      if (!this.isActive(tag)) return {};
      return {
        "background-color": this.theme,
        "border-color": this.theme
      };
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    isFirstView() {
      try {
        return this.selectedTag.fullPath === '/index' || this.selectedTag.fullPath === this.visitedViews[1].fullPath
      } catch (err) {
        return false
      }
    },
    isLastView() {
      try {
        return this.selectedTag.fullPath === this.visitedViews[this.visitedViews.length - 1].fullPath
      } catch (err) {
        return false
      }
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tag/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tag/addView', this.$route)
        if (this.$route.meta.link) {
          this.$store.dispatch('tag/addIframeView', this.$route)
        }
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tag/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$tab.refreshPage(view);
      if (this.$route.meta.link) {
        this.$store.dispatch('tag/delIframeView', this.$route)
      }
    },
    closeSelectedTag(view) {
      this.$tab.closePage(view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeRightTags() {
      this.$tab.closeRightPage(this.selectedTag).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeLeftTags() {
      this.$tab.closeLeftPage(this.selectedTag).then(visitedViews => {
        if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
          this.toLastView(visitedViews)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.fullPath).catch(() => { });
      this.$tab.closeOtherPage(this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$tab.closeAllPage().then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === this.$route.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      // const left = e.clientX - offsetLeft + 15 // 15: margin right
      const left = e.clientX // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY + 18
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    }
  }
}
</script>

<style lang='scss' scoped>
.top-tag-vue {
  height: 30px;
  width: 100%;
  background: var(--bg-topTag);
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    height: 100%;

    ::v-deep .el-scrollbar__wrap {
      height: 100% !important;
      margin-bottom: 0 !important;
      margin-right: 0 !important;
      overflow: auto;

      .el-scrollbar__view {
        height: 100%;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        .tags-view-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          height: 24px;
          margin-left: 10px;
          padding: 0 30px;
          cursor: pointer;
          border-radius: 3px;
          background-color: var(--bg-topTag);
          border: 1px solid var(--bcs);
          color: var(--fcpl);
          font-size: 12px;
          text-decoration: none;

          &:first-of-type {
            margin-left: 15px;
          }

          &:last-of-type {
            margin-right: 15px;
          }

          &.active {
            background-color: var(--tc);
            border-color: var(--tc);
            color: #fff;

            .tag-close {
              color: #fff;
            }
          }

          &:has(.tag-close) {
            padding: 0 30px 0 20px;
          }

          .tag-title {
            font-size: 12px;
          }

          .tag-close {
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(calc(-50% + 1px));
            width: 1em;
            height: 1em;
            color: var(--fcs);

            &:hover {
              scale: 1.1;
            }
          }
        }
      }
    }
  }

  .contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: var(--bg-inner-primary);
    z-index: 3000;
    list-style-type: none;
    border-radius: 4px;
    color: var(--fcs);
    font-size: 12px;
    font-weight: 400;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      display: flex;
      align-items: center;
      height: 30px;
      margin: 0;
      padding: 0 15px;
      font-size: 12px;
      cursor: pointer;


      .operate-text {
        display: block;
        font-size: 12px;
        line-height: 12px;
      }

      i {
        display: block;
        width: 12px;
        height: 12px;
        font-size: 12px;
        line-height: 12px;
        margin-right: 5px;
        margin-top: 1px;
      }

      &:hover {
        background: var(--bg-hover);
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      // width: 16px;
      // height: 16px;
      // vertical-align: 2px;
      // border-radius: 50%;
      // text-align: center;
      // transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      // transform-origin: 100% 50%;

      // &:before {
      //   transform: scale(0.6);
      //   display: inline-block;
      //   vertical-align: -3px;
      // }

      // &:hover {
      //   // background-color: #b4bccc;
      //   scale: 1.1;
      //   width: 12px !important;
      //   height: 12px !important;
      // }
    }
  }
}
</style>
