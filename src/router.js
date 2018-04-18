import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AgreementDetails from '@/components/AgreementDetails'
import Ad from '@/components/Ad'
import TransactionList from '@/components/TransactionList'
import Community from '@/components/Community'
import Messages from '@/components/Messages'
import Profile from '@/components/Profile'
import OtherUserProfile from '@/components/OtherUserProfile'
import SearchUser from '@/components/SearchUser'
import CreateAccount from '@/components/CreateAccount'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/', redirect: '/wallet'},
    {path: '/wallet', component: TransactionList},
    {path: '/community', component: Community},
    {path: '/community/ad/:id', component: Ad, props: true},
    {path: '/community/ads/create', component: Community},
    {path: '/community/my-ads', component: Community},
    {path: '/messages', component: Messages},
    {path: '/profile', component: Profile},
    {path: '/profile/:userId', component: OtherUserProfile, props: true},
    {path: '/admin', component: SearchUser},
    {path: '/login', component: Login},
    {path: '/create-account', component: CreateAccount},
    {path: '/agreements/:id', component: AgreementDetails, props: true}
  ]
});

export default router
