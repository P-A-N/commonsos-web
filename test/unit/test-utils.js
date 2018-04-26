import {mount as vmount, shallow as vshallow} from '@vue/test-utils'
import i18n from '@/i18n'
import VueRouter from 'vue-router'

export let router = new VueRouter()

export function mount(component, options) {
  return vmount(component, Object.assign({router, i18n}, options))
}

export function rmount(component, options) {
  let wrapper = vmount(component, Object.assign({router, i18n}, options))

  if (component.beforeRouteEnter) {
    let propsData = options && options.propsData || {}
    component.beforeRouteEnter({params: propsData}, {}, (f) => {f(wrapper.vm)})
  }
  return wrapper
}

export function shallow(component) {
  return vshallow(component)
}
