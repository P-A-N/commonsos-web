import Vue from 'vue'
import AdList from '@/components/AdList'

describe('AdList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(AdList)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('table').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
