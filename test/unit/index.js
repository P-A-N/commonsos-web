import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
import Vuetify from 'vuetify'
Vue.use(Vuetify)
//Vuetify.install(Vue)

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
//const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
//srcContext.keys().forEach(srcContext)
