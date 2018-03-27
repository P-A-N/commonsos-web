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
      let adRows = wrapper.findAll('table tbody tr')
      expect(adRows.at(0).text()).toContain('2 months ago user1 user2 1.11')
      expect(adRows.at(1).text()).toContain('23 days ago user2 user1 2.22')
      expect(gateway.get).toHaveBeenCalledWith('transactions')
      done()
    }, 0)
  })
})
