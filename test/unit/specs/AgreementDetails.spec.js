import AgreementDetails from '@/components/AgreementDetails'
import {mount} from '@vue/test-utils'
import router from '@/router'
import gateway from '@/gateway'

describe('AgreementDetails.vue', () => {

  beforeEach(() => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({
      data: {
        createdAt: '2018-01-30T22:51:00',
        providerId: 'user1',
        title: 'title1',
        description: 'description1',
        location: 'my home',
        amount: 1.23,
        transactionData: 'secret'
      }}))
  })

  it('should display details', (done) => {
    let wrapper = mount(AgreementDetails, {propsData: {id: '321'}})

    setTimeout(() => {
      expect(gateway.get).toHaveBeenCalledWith('agreements/321')

      expect(wrapper.text()).toContain('title1')
      expect(wrapper.text()).toContain('Description description1')
      expect(wrapper.text()).toContain('Location my home')
      expect(wrapper.text()).toContain('Reward 1.23')
      expect(wrapper.find('img').attributes().src.startsWith('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhm')).toBeTruthy()
      done()
    }, 10)
  })

  it('navigates back', function () {
    let wrapper = mount(AgreementDetails)
    spyOn(router, 'back')

    wrapper.find('button[name="back"]').trigger('click')

    expect(router.back).toHaveBeenCalled()
  });

  it('prints details', function () {
    let wrapper = mount(AgreementDetails)
    spyOn(window, 'print')

    wrapper.find('button[name="print"]').trigger('click')

    expect(window.print).toHaveBeenCalled()
  });

})
