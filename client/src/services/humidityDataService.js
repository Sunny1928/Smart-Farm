import Api from '@/services/api'

const url = 'humidityDatas/'

export default {
  index () {
    return Api().get(`${url}allHumidityDatas`)
  },
  post (item) {
    return Api().post(`${url}addHumidityData`, item)
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