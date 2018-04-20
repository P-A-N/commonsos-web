import {mount as vmount} from '@vue/test-utils'
import i18n from '@/i18n'
import VueRouter from 'vue-router'

export let router = new VueRouter()

export function mount(component) {
  return vmount(component, {router, i18n})
}
