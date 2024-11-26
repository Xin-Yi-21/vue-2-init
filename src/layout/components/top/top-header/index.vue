<template>
  <div class="top-header-vue">
    <div class="project">
      <c-icon i="c-logo" cursor="auto" size="24"></c-icon>
      <div class="title">项目初始化系统</div>
      <Breadcrumb v-if="setting.topHeader.isBreadcrumb" separator=">" class="breadcrumb-container" />
    </div>

    <div class="menu"> </div>

    <div class="time" v-html="time"></div>
    <!-- <div class="user-name"><c-icon i="c-account"></c-icon> <span>admin</span></div> -->
    <el-dropdown @command="handleCommand" class="setting" trigger="click" append-to-body="true">
      <div class="avatar">
        <img :src="user.avatar" />
        <span class="name">admin</span>
        <el-icon><caret-bottom /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="profile">
            <c-icon i="c-account"></c-icon>
            <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item command="userManage">
            <c-icon i="c-user-manage"></c-icon>
            <span>用户管理</span>
          </el-dropdown-item>
          <el-dropdown-item command="layoutSet">
            <c-icon i="c-layout"></c-icon>
            <span>布局设置</span>
          </el-dropdown-item>
          <div class="line"></div>
          <el-dropdown-item command="logout">
            <c-icon i="c-logout"></c-icon>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import Breadcrumb from '@/components/system/breadcrumb'
export default {
  components: { Breadcrumb },
  data() {
    return {
      time: '',
      timer: null,
    }
  },
  computed: {
    user() { return this.$store.state.user },
    setting() { return this.$store.state.setting },
  },
  created() {
    this.init()
  },
  onBeforeDestory() {
    clearInterval(this.timer)
  },
  methods: {
    // 一、初始化相关
    // 0、初始化总调用
    init() {
      this.initTime()
      this.timer = setInterval(() => { this.initTime() }, 1000)
    },
    // 1、初始化时间
    initTime() {
      const weekdayLRV = { Monday: '星期一', Tuesday: '星期二', Wednesday: '星期三', Thursday: '星期四', Friday: '星期五', Staturday: '星期六', Sunday: '星期日' }
      this.time = this.$dayjs().format('YYYY-MM-DD') + ' ' + weekdayLRV[this.$dayjs().format('dddd')] + ' ' + this.$dayjs().format('HH:mm:ss')
    },
    // 二、操作相关
    // 1、处理命令
    handleCommand(command) {
      switch (command) {
        case 'profile':
          this.goProfile()
          break
        case 'layoutSet':
          this.setLayout()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    // 2、个人中心
    goProfile() {
      this.$router.push('/user/profile')
    },
    // 3、布局设置
    setLayout() {
      this.$emit('setLayout')
    },
    // 3、登出
    logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', customClass: 'c-message-confirm' }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index'
        })
      }).catch(() => { })
    },
  }
}
</script>
<style lang="scss" scoped>
::v-deep.top-header-vue {
  display: flex;
  align-items: center;
  // background-image: url(@/assets/images/bg-header.png);
  // background-repeat: no-repeat;
  // background-size: cover;
  background-color: var(--bg-topHeader);
  border-bottom: 1px solid var(--bcp);
  font-size: 14px;

  &.is-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  }

  .project {
    display: flex;
    align-items: center;

    .svg-icon {
      margin: 0 10px;
      color: var(--fcpl);
      font-size: 24px !important;
    }

    .title {
      display: flex;
      align-items: center;
      color: var(--fcpl);
      font-size: 30px;
      font-weight: 700;
      text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.33);
    }

    .breadcrumb-container {
      font-size: 14px;
      margin-left: 10px;

      &::before {
        // content: '>';
        margin-right: 10px;
        color: var(--fcs);
        font-size: 16px;
      }

      .el-breadcrumb__inner {
        a {
          color: var(--fcs);
        }

        .no-redirect {
          color: var(--fcs);
        }
      }

      .el-breadcrumb__separator {
        color: var(--fcs);
      }
    }
  }

  .menu {
    flex: 1;
  }

  .time {
    font-family: PingFang SC, PingFang SC;
    font-weight: 800;
    font-size: 20px;
    color: var(--fcs);
    line-height: 28px;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.33);
    margin-right: 50px;
  }

  .user-name {
    display: flex;
    align-items: center;
    margin-right: 50px;
    // vertical-align: middle;
  }

  .setting {
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      img {
        scale: 1.1;
      }
    }

    .avatar {
      height: 40px;
      display: flex;
      align-items: center;

      img {
        width: 36px;
        height: 36px;
        margin-right: 10px;
        padding: 2px;
        border: 2px solid var(--fcpl);
        border-radius: 50%;
        background-color: #fff;
      }

      >span {
        margin-right: 10px;
        color: var(--fcpl);
      }
    }
  }


}

::v-deep.el-dropdown-menu {
  .el-dropdown-menu__item {
    display: flex;
    align-items: center;

    &>span {
      margin-right: 5px;
    }
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: var(--bcp);
    margin: 5px 0;
  }
}
</style>
