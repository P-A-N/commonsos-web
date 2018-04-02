// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import VueMoment from 'vue-moment'

import 'vuetify/dist/vuetify.css'

import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(VueMoment)
Vue.config.productionTip = false

window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})