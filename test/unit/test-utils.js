import {mount as vmount, shallow as vshallow} from '@vue/test-utils'
import i18n from '@/i18n'
import VueRouter from 'vue-router'

export let router = new VueRouter()

export function mount(component, options) {
  return vmount(component, Object.assign({router, i18n}, options))
}

export function shallow(component) {
  return vshallow(component)
}
