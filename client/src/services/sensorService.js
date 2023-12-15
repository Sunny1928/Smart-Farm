import Api from '@/services/api'

const url = 'sensors/'

export default {
  index () {
    return Api().get(`${url}allSensors`)
  },
  post (item) {
    return Api().post(`${url}addSensor`, item)
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