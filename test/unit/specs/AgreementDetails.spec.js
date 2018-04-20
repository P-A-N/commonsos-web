import AgreementDetails from '@/components/AgreementDetails'
import {mount} from '../test-utils'
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
      expect(wrapper.text()).toContain('Reward claim code: secret')
      expect(gateway.get).toHaveBeenCalledWith('agreements/321')
      expect(wrapper.find('img').attributes().src.startsWith('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhm')).toBeTruthy()
      done()
    }, 100)
  })
})
