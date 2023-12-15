import Api from '@/services/api'

const url = 'notes/'

export default {
  index () {
    return Api().get(`${url}allnotes`)
  },
  post (item) {
    return Api().post(`${url}addNote`, item)
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