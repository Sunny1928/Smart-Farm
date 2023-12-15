import Api from '@/services/api'

const url = 'users/'

export default {
  register (credentials) {
    return Api().post(`${url}addUser`, credentials)
  },
  login (credentials) {
    return Api().post(`${url}login`, credentials)
  },
  logout(){
    return Api().post(`${url}logout`)
  },
  index(){
    return Api().get(`${url}allUsers`)
  },
  get(id){
    return Api().get(`${url}${id}`)
  },
  put (item) {
    return Api().put(`${url}${item.id}`, item)
  },
  delete (item) {
    return Api().delete(`${url}${item.id}`)
  },
  refreshToken(item){
    return Api().post(`${url}token`, item)
  }
}