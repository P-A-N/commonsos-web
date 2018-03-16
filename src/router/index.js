import Vue from 'vue'
import Router from 'vue-router'
import AdList from '@/components/AdList'
import MyAdList from '@/components/MyAdList'
import AdCreate from '@/components/AdCreate'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/ads'},
    {path: '/ads', component: AdList},
    {path: '/my-ads', component: MyAdList},
    {path: '/ads/create', component: AdCreate}
  ]
})
