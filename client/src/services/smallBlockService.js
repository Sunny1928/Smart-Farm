import Api from '@/services/api'

const url = 'smallblocks/'

export default {
  index () {
    return Api().get(`${url}allSmallBlocks`)
  },
  post (item) {
    return Api().post(`${url}addSmallBlock`, item)
  },
  get (id) {
    return Api().get(`${url}${id}`)
  },
  getNewest (id) {
    return Api().get(`${url}new/${id}`)
  },
  put (item) {
    return Api().put(`${url}${item.id}`, item)
  },
  delete (item) {
    return Api().delete(`${url}${item.id}`)
  }
}