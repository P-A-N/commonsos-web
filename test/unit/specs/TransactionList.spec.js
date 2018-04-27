import TransactionList from '@/components/TransactionList'
import {rmount as mount} from '../test-utils'
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
        {createdAt: '2018-01-30T22:51:00', remitter: {id: 'user1', fullName: 'name1'}, beneficiary: {id: 'user2', fullName: 'name2'}, amount: 1.11, debit:true, description: 'Payment description'},
        {createdAt: '2018-02-24T11:22:33', remitter: {id: 'user2', fullName: 'name2'}, beneficiary: {id: 'user1', fullName: 'name1'}, amount: 2.22, debit:false, description:'Topup from community'}
      ]
    }))
    spyOn(userService, 'user').and.returnValue({})

    let wrapper = mount(TransactionList)

    setTimeout(() => {
      let transactions = wrapper.findAll('.transaction')

      expect(transactions.at(0).text()).toContain('2 months ago')
      expect(transactions.at(0).text()).toContain('name2')
      expect(transactions.at(0).text()).toContain('-1.11')
      expect(transactions.at(0).text()).toContain('Payment description')

      expect(transactions.at(1).text()).toContain('23 days ago')
      expect(transactions.at(1).text()).toContain('name2')
      expect(transactions.at(1).text()).toContain('+2.22')
      expect(transactions.at(1).text()).toContain('Topup from community')

      expect(gateway.get).toHaveBeenCalledWith('transactions')
      expect(wrapper.text()).not.toContain('No transactions')
      done()
    }, 0)
  })

  it('should display alert when no transactions present', (done) => {
    gateway.get.and.returnValue(Promise.resolve({data: []}))
    spyOn(userService, 'user').and.returnValue({id: 'user1'})

    let wrapper = mount(TransactionList)

    setTimeout(() => {
      expect(wrapper.findAll('.transaction').length).toBe(0)
      expect(wrapper.text()).toContain('You don\'t have any coins yet.')
      done()
    }, 0)
  })
})
