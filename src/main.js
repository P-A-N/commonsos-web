import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from '@/App'
import router from '@/router'
import VueMoment from 'vue-moment'
import 'vuetify/dist/vuetify.css'
import './assets/scss/main.scss'
import Vuetify from 'vuetify'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
import i18n from '@/i18n'
import PushNotifications from '@/services/PushNotifications'

Vue.use(VuetifyGoogleAutocomplete, {apiKey: 'AIzaSyAQG-BHBT4-GHFDK0V5k-pkYQ2UT5834pw'});
Vue.use(Vuetify)
Vue.use(VeeValidate, {i18n: i18n})
Vue.use(VueMoment)
Vue.config.productionTip = false

window.$vm = new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

window.$router = router

PushNotifications.init()