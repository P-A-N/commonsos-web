import Vue from 'vue'
import JobList from '@/components/JobList'

describe('JobList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(JobList)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('table').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
