import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import VueMoment from 'vue-moment'
import 'vuetify/dist/vuetify.css'
import Vuetify from 'vuetify'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.use(VuetifyGoogleAutocomplete, {apiKey: 'AIzaSyAQG-BHBT4-GHFDK0V5k-pkYQ2UT5834pw'});
Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(VueMoment)
Vue.config.productionTip = false

window.$vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

window.$router = router