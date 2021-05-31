import { login, getInfo, getMenu } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { notify } from '@/utils'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_UUID: (state, uuid) => {
    state.uuid = uuid
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_GRID: (state, grid) => {
    state.gird = grid
  },
  SET_AREA: (state, area) => {
    state.area = area
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { msg, obj, success } = response
        if (success) {
          commit('SET_UUID', obj.userUuid)
          // commit('SET_ROLES', [obj.userRoleUuid])
          // commit('SET_NAME', obj.userName)
          // commit('SET_PHONE', obj.userPhone)
          setToken(obj.userUuid)
        } else {
          notify(msg, false)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      const uuid = getToken()
      getInfo(uuid).then(response => {
        const { obj } = response

        if (!obj) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('登录失败，请重新登录。。。')
        }
        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        commit('SET_NAME', obj.userName)
        commit('SET_PHONE', obj.userPhone)
        commit('SET_AREA', obj.userArea)
        commit('SET_GRID', obj.userGrid)
        getMenu().then(res => {
          const { obj } = res
          const roleArray = obj.roleContent.split('|')
          commit('SET_ROLES', roleArray)
          // obj.roles = res.data
          resolve(roleArray)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      // resetRouter()
      commit('RESET_STATE')
      resolve()
      /* logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      }) */
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
