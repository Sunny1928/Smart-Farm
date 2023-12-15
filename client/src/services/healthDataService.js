import Api from '@/services/api'

const url = 'healthDatas/'

export default {
  index () {
    return Api().get(`${url}allHealthDatas`)
  },
  post (item) {
    return Api().post(`${url}addHealthData`, item)
  },
  get (id) {
    return Api().get(`${url}${id}`)
  },
  put (item) {
    return Api().put(`${url}${item.id}`, item)
  },
  delete (item) {
    return Api().delete(`${url}${item.id}`)
  }
}