import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
import Vuetify from 'vuetify'
Vue.use(Vuetify)

Vue.config.productionTip = false

const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

beforeEach(() => {
  window.$router = jasmine.createSpyObj('router', ['push', 'resolve'])
})
