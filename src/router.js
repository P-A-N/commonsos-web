import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AdList from '@/components/AdList'
import AgreementList from '@/components/AgreementList'
import AdCreate from '@/components/AdCreate'
import AgreementDetails from '@/components/AgreementDetails'
import ClaimReward from '@/components/ClaimReward'
import TransactionList from '@/components/TransactionList'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', redirect: '/ads'},
    {path: '/login', component: Login},
    {path: '/ads', component: AdList},
    {path: '/ads/create', component: AdCreate},
    {path: '/agreements', component: AgreementList},
    {path: '/agreements/:id', component: AgreementDetails, props: true},
    {path: '/claim-reward', component: ClaimReward},
    {path: '/transactions', component: TransactionList},
  ]
})

export default router
