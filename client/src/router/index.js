import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../components/HomeView.vue'
import PlantView from '../components/PlantView.vue'
import AccountView from '../components/AccountView.vue'
import NoteView from '../components/NoteView.vue'
import LoginView from '../components/LoginView.vue'
import IndexView from '../components/IndexView.vue'
import SP from '../components/SP.vue'
import test from '../components/test.vue'
import Manage from '../components/manage/farmComponent.vue'
import ManageDetail from '../components/manage/manageDetailView.vue'
import ManageData from '../components/manage/manageDataView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'indexView',
    component: IndexView
  },
  {
    path: '/home',
    name: 'homeView',
    component: HomeView
  },
  {
    path: '/plant',
    name: 'plantView',
    component: PlantView
  },
  {
    path: '/account',
    name: 'accountView',
    component: AccountView
  },
  {
    path: '/note',
    name: 'noteView',
    component: NoteView
  },
  {
    path: '/login',
    name: 'loginView',
    component: LoginView
  },
  {
    path: '/sp/:smallBlockId',
    name: 'SP',
    component: SP
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage
  },
  {
    path: '/manage/:farmId',
    name: 'manageDetail',
    component: ManageDetail
  },
  {
    path: '/managedata/:smallBlockId',
    name: 'manageData',
    component: ManageData
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
