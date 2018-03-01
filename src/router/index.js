import Vue from 'vue'
import Router from 'vue-router'
import JobList from '@/components/JobList'
import JobAdd from '@/components/JobAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: JobList},
    {path: '/jobs', component: JobList},
    {path: '/jobs/add', component: JobAdd}
  ]
})
