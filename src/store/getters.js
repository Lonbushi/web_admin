

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  id: state => state.user.id,
  avatar: state => state.user.avatar,
  nick_name: state => state.user.nick_name,
  role: state => state.user.role,
  email: state => state.user.email,
  phone_num: state => state.user.phone_num,
}
export default getters
