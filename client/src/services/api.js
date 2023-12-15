import axios from 'axios'
import store from '@/store'

export default () => {
  return axios.create({
    // baseURL: `http://localhost:8088/api/`,
    // baseURL: `http://114.33.145.3/api/`,
    // withCredentials: true,
    baseURL: window.location.protocol + '//' + window.location.host+'/api/',
    headers:{
      Authorization: `Bearer ${store.state.accessToken}`
    }
  })
}
