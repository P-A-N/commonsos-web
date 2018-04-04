import TransactionList from '@/components/TransactionList'
import {mount} from '@vue/test-utils'
import gateway from '@/gateway'
import Vue from 'vue'
import VueMoment from 'vue-moment'

describe('TransactionList.vue', () => {

  beforeEach(() => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({}))
    Vue.use(VueMoment)
    jasmine.clock().mockDate(new Date('2018-03-19T11:58:00'));
  })

  it('should display user transactions', (done) => {
    gateway.get.and.returnValue(Promise.resolve({
      data: [
        {createdAt: '2018-01-30T22:51:00', remitterId: 'user1', beneficiaryId: 'user2', amount: 1.11},
        {createdAt: '2018-02-24T11:22:33', remitterId: 'user2', beneficiaryId: 'user1', amount: 2.22}
      ]
    }))

    let wrapper = mount(TransactionList)

    setTimeout(() => {
      expect(wrapper.text()).toContain('1.11 points 2 months ago from user1 to user2')
      expect(wrapper.text()).toContain(('2.22 points 23 days ago from user2 to user1'))
      expect(gateway.get).toHaveBeenCalledWith('transactions')
      done()
    }, 0)
  })
})
