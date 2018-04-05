import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AgreementDetails from '@/components/AgreementDetails'
import TransactionList from '@/components/TransactionList'
import Community from '@/components/Community'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', redirect: '/transactions'},
    {path: '/wallet', component: TransactionList},
    {path: '/community/ads', component: Community},
    {path: '/community/ads/create', component: Community},
    {path: '/community/agreements', component: Community},
    {path: '/login', component: Login},
    {path: '/agreements/:id', component: AgreementDetails, props: true},
    {path: '/transactions', component: TransactionList},
  ]
})

export default router
