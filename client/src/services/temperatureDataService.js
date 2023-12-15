import Api from '@/services/api'

const url = 'temperatureDatas/'

export default {
  index () {
    return Api().get(`${url}allTemperatureDatas`)
  },
  post (item) {
    return Api().post(`${url}addTemperatureData`, item)
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