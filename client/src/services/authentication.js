import Api from '@/services/api'

export default {
  register (credentials) {
    return Api().post('user', credentials)
  },
  login (credentials) {
    return Api().get(`user/${credentials.account}/login`, 
    {
      headers: {
        password: credentials.password,
      }
    })
  },
  getUserInfo (credentials) {
    return Api().get(`user/${credentials.account}`, 
    {
      headers: {
        Authorization: credentials.token,
      }
    })
  }
}