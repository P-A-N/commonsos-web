import Vue from 'vue'
import 'vue-toastr/src/vue-toastr.less'
import './notifications.css'
import Toastr from 'vue-toastr'

Vue.use(Toastr)

let instance = Vue.prototype.$toastr
instance.defaultTimeout = 5000;
instance.defaultProgressBar = false;

export default instance
