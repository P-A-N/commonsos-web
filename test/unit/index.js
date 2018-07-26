import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import VueMoment from 'vue-moment'
import VueRouter from 'vue-router'
import i18n from '@/i18n'

Vue.use(VeeValidate)
Vue.use(Vuetify)
Vue.use(VueMoment)
Vue.use(VueRouter)

Vue.config.productionTip = false

i18n.locale = 'en'

const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

beforeEach(() => {
  window.$router = jasmine.createSpyObj('router', ['push', 'resolve', 'back'])
})
