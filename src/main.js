// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import VueMoment from 'vue-moment'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import './main.scss'

Vue.use(BootstrapVue)
Vue.use(VeeValidate)
Vue.use(VueMoment)
Vue.component('icon', Icon)
Vue.config.productionTip = false

window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})