import Vue from 'vue'
import Router from 'vue-router'
import AdList from '@/components/AdList'
import AdCreate from '@/components/AdCreate'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: AdList},
    {path: '/ads', component: AdList},
    {path: '/ads/create', component: AdCreate}
  ]
})
