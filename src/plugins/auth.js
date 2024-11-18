import store from '@/store'

function authPermission(permission) {
  const all_permission = "*:*:*";
  const permissions = store.getters && store.getters.permissions
  if (permission && permission.length > 0) {
    return permissions.some(v => {
      return all_permission === v || v === permission
    })
  } else {
    return false
  }
}

function authRole(role) {
  const super_admin = "admin";
  const roles = store.getters && store.getters.roles
  if (role && role.length > 0) {
    return roles.some(v => {
      return super_admin === v || v === role
    })
  } else {
    return false
  }
}


function authPerson(persons) {
  const person = store.getters && store.getters.personId
  const super_admin = 1
  if (person && persons && persons instanceof Array) {
    let flag = persons.some(v => {
      return v === person
    })
    if (person == super_admin) { flag = true }
    return flag
  } else {
    return false
  }
}

// function authPerson(personAbout) {
//   const person = personAbout[0]
//   const persons = personAbout[1]
//   const super_admin = '1'
//   if (person && persons && persons instanceof Array) {
//     let flag = persons.some(v => {
//       return v === person
//     })
//     if (person == super_admin) { flag = true }
//     return flag
//   } else {
//     return false
//   }
// }

export default {
  // 验证用户是否具备某权限
  hasPermi(permission) {
    return authPermission(permission);
  },
  // 验证用户是否含有指定权限，只需包含其中一个
  hasPermiOr(permissions) {
    return permissions.some(item => {
      return authPermission(item)
    })
  },
  // 验证用户是否含有指定权限，必须全部拥有
  hasPermiAnd(permissions) {
    return permissions.every(item => {
      return authPermission(item)
    })
  },
  // 验证用户是否具备某角色
  hasRole(role) {
    return authRole(role);
  },
  // 验证用户是否含有指定角色，只需包含其中一个
  hasRoleOr(roles) {
    return roles.some(item => {
      return authRole(item)
    })
  },
  // 验证用户是否含有指定角色，必须全部拥有
  hasRoleAnd(roles) {
    return roles.every(item => {
      return authRole(item)
    })
  },
  // 验证用户是否是其中之一人物
  hasPerson(personAbout) {
    return authPerson(personAbout);
  }
}
