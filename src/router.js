import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AgreementDetails from '@/components/AgreementDetails'
import TransactionList from '@/components/TransactionList'
import Community from '@/components/Community'
import Messages from '@/components/Messages'
import CreateAccount from '@/components/CreateAccount'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', redirect: '/wallet'},
    {path: '/wallet', component: TransactionList},
    {path: '/community', component: Community},
    {path: '/messages', component: Messages},
    {path: '/login', component: Login},
    {path: '/create-account', component: CreateAccount},
    {path: '/agreements/:id', component: AgreementDetails, props: true}
  ]
});

export default router
