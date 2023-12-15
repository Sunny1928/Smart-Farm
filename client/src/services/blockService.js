import Api from '@/services/api'

const url = 'blocks/'

export default {
  index () {
    return Api().get(`${url}allBlocks`)
  },
  post (item) {
    return Api().post(`${url}addBlock`, item)
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