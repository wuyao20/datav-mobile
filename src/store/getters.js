const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  area: state => state.user.area,
  grid: state => state.user.gird,
  phone: state => state.user.phone,
  jobNum: state => state.user.jobNum,
  uuid: state => state.user.uuid
}
export default getters
