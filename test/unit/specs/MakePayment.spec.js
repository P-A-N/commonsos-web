import {mount} from '../test-utils'
import MakePayment from '@/components/MakePayment'
import gateway from '@/gateway'
import userService from '@/services/UserService'
import notifications from '@/services/notifications'

describe('MakePayment.vue', () => {

  beforeEach(() => {
    spyOn(gateway, 'post').and.returnValue(Promise.resolve({}))
  })

  it('should show validation errors', (done) => {
    const wrapper = mount(MakePayment, {propsData: {
      beneficiary: {id: 'beneficiary id', fullName: 'beneficiary name'}},
    })

    wrapper.find('button').trigger('click')

    setTimeout(function() {
      expect(wrapper.text()).toContain('The description field is required.')
      expect(wrapper.text()).toContain('The amount field is required.')
      done()
    }, 0)
  })

  it('should show payment data passed via props', (done) => {
    const wrapper = mount(MakePayment, {propsData: {
        beneficiary: {id: 'beneficiary id', fullName: 'Joe Dow'},
        amount: '123.45',
        description: 'foo bar'
    }})

    setTimeout(function() {
      expect(wrapper.find('[name="amount"]').element.value).toContain('123.45')
      expect(wrapper.find('[name="description"]').element.value).toContain('foo bar')
      expect(wrapper.find('[name="beneficiary"]').element.value).toContain('Joe Dow')
      done()
    }, 0)
  })

  it('should not submit transaction to backend if user does not confirm', (done) => {
    let props = {
      beneficiary: {id: 'beneficiary id', fullName: 'Joe Dow'},
      amount: '123.45',
      description: 'foo bar'
    }

    const wrapper = mount(MakePayment, {propsData: props})
    spyOn(window, 'confirm').and.returnValue(false)

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(window.confirm).toHaveBeenCalledWith('Transfer 123.45 coins to Joe Dow?')
      expect(gateway.post).not.toHaveBeenCalled()
      done();
    }, 0);
  })

  it('should submit transaction to backend', (done) => {
    let props = {
        closeModal: jasmine.createSpy(),
        beneficiary: {id: 'beneficiary id', fullName: 'Joe Dow'},
        amount: '123.45',
        description: 'foo bar'
      }
    spyOn(userService, 'loadUser')
    spyOn(notifications, 'i')
    spyOn(window, 'confirm').and.returnValue(true)
    const wrapper = mount(MakePayment, {propsData: props})

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(wrapper.vm.sendingTransaction).toBeFalsy()
      expect(userService.loadUser).toHaveBeenCalled()
      expect(notifications.i).toHaveBeenCalledWith('Transfered 123.45 coins to Joe Dow')
      expect(gateway.post).toHaveBeenCalledWith('/transactions', {amount: '123.45', description: 'foo bar', beneficiaryId: 'beneficiary id'})
      expect(props.closeModal).toHaveBeenCalled()
      done();
    }, 0);
  })

  it('should submit specified ad id to backend', (done) => {
    let props = {
        closeModal: jasmine.createSpy(),
        beneficiary: {id: 'beneficiary id', fullName: 'Joe Dow'},
        amount: '123.45',
        description: 'foo bar',
        ad: {id: '33'}
      }

    spyOn(window, 'confirm').and.returnValue(true)
    const wrapper = mount(MakePayment, {propsData: props})

    wrapper.find('button').trigger('click')

    setTimeout(() => {
      expect(gateway.post).toHaveBeenCalledWith('/transactions', {amount: '123.45', description: 'foo bar', beneficiaryId: 'beneficiary id', adId: '33'})
      done();
    }, 0);
  })
})