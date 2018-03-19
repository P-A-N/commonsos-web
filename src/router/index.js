import Vue from 'vue'
import Router from 'vue-router'
import AdList from '@/components/AdList'
import AgreementList from '@/components/AgreementList'
import AdCreate from '@/components/AdCreate'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/ads'},
    {path: '/ads', component: AdList},
    {path: '/ads/create', component: AdCreate},
    {path: '/agreements', component: AgreementList},
  ]
})
