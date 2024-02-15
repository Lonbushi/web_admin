import { login, logout, getInfo, getUserAll} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    // info:[]
    id:'',
    nick_name:'',
    avatar:'',
    email:'',
    create_time:'',
    phone_num:'',
    disabled:'',
    username:'',
    role:'',
    user_info_all:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.id = userInfo.id
    state.nick_name = userInfo.nick_name
    state.avatar = userInfo.avatar
    state.role = userInfo.role
    state.email = userInfo.email
    state.phone_num = userInfo.phone_num
    state.disabled = userInfo.disabled
    state.create_time = userInfo.create_time
    state.username = userInfo.username
  },
  SET_USER_INFO_ALL: (state,userAll) => {
    state.user_info_all = userAll
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password}).then(response => {
        console.log('登录响应：', response)
        const { data } = response
        // console.log(data.token);
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        console.error('登录请求失败：', error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USER_INFO', data)
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },

    // get user info all
    getUserAll({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserAll(state.token).then(response => {
          const { data } = response
  
          if (!data) {
            return reject('Verification failed, please Login again.')
          }

          commit('SET_USER_INFO_ALL', data)
          console.log("全部用户数据",data);
          resolve(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
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

