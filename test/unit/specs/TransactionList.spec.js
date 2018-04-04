import TransactionList from '@/components/TransactionList'
import {mount} from '@vue/test-utils'
import gateway from '@/gateway'
import Vue from 'vue'
import VueMoment from 'vue-moment'
import userService from '@/services/UserService'

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
    spyOn(userService, 'user').and.returnValue({id: 'user1'})

    let wrapper = mount(TransactionList)

    setTimeout(() => {
      let transactions = wrapper.findAll('.transaction')

      expect(transactions.at(0).text()).toContain('2 months ago')
      expect(transactions.at(0).text()).toContain('from user1 to user2')
      expect(transactions.at(0).text()).toContain('-1.11')

      expect(transactions.at(1).text()).toContain('23 days ago')
      expect(transactions.at(1).text()).toContain('from user2 to user1')
      expect(transactions.at(1).text()).toContain('+2.22')

      expect(gateway.get).toHaveBeenCalledWith('transactions')
      done()
    }, 0)
  })
})
