import Ad from '@/components/Ad'
import {rmount} from '../test-utils'
import gateway from '@/gateway'

describe('Ad.vue', () => {

  it('should display ad details', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {
        createdAt: '2018-02-23T15:40Z',
        title: 'Mayor job',
        description: 'Nice details',
        points: 2.22,
        location: 'location2',
        type: 'WANT',
        own: false,
        createdBy: {id: 22, avatarUrl: ''}
      }}))

    let wrapper = rmount(Ad, {propsData: {id: '1'}})

    setTimeout(() => {
      expect(wrapper.text()).toContain('WANT')
      expect(wrapper.text()).toContain('Nice details')
      expect(wrapper.text()).toContain('Mayor job')
      expect(wrapper.findAll('.message-button').length).toBe(1)
      expect(wrapper.vm.ad.photoUrl).toBeDefined()
      expect(gateway.get).toHaveBeenCalledWith('/ads/1')
      done()
    }, 0)
  })

  it('hides pay button for non-orderable ad', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {
        payable: false,
        own: false,
        createdBy: {id: 22, avatarUrl: ''}
      }}))

    let wrapper = rmount(Ad, {propsData: {id: '1'}})

    setTimeout(() => {
      expect(wrapper.findAll('.message-button').length).toBe(1)
      done()
    }, 0)
  })

  it('shows upload photo button for own ad', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {
        payable: false,
        own: true,
        createdBy: {id: 22, avatarUrl: ''}
      }}))

    let wrapper = rmount(Ad, {propsData: {id: '1'}})

    setTimeout(() => {
      expect(wrapper.findAll('.upload-photo-button').length).toBe(1)
      done()
    }, 0)
  })

  it('hides message button for own ad', (done) => {
    spyOn(gateway, 'get').and.returnValue(Promise.resolve({data: {
        payable: false,
        own: true,
        createdBy: {id: 22, avatarUrl: ''}
      }}))

    let wrapper = rmount(Ad, {propsData: {id: '1'}})

    setTimeout(() => {
      expect(wrapper.findAll('.message-button').length).toBe(0)
      done()
    }, 0)
  })

  describe('photo', function () {

    function adWithPropertiesOwnAndPhoto(own, photoUrl) {
      spyOn(gateway, 'get').and.returnValue(Promise.resolve({
        data: {
          own: own,
          photoUrl: photoUrl,
          createdBy: {id: 22, avatarUrl: ''}
        }
      }))
    }

    it('is present in own ad', function (done) {
      adWithPropertiesOwnAndPhoto(true, '/photo')

      let wrapper = rmount(Ad, {propsData: {id: '1'}})

      setTimeout(() => {
        expect(wrapper.vm.adPhotoOrPlaceHolder()).toBe('/photo')
        done()
      }, 0)
    })

    it('is present in other user ad ad', function (done) {
      adWithPropertiesOwnAndPhoto(false, '/photo')

      let wrapper = rmount(Ad, {propsData: {id: '1'}})

      setTimeout(() => {
        expect(wrapper.vm.adPhotoOrPlaceHolder()).toBe('/photo')
        done()
      }, 0)
    })

    it('is missing in own ad', function (done) {
      adWithPropertiesOwnAndPhoto(true, '')

      let wrapper = rmount(Ad, {propsData: {id: '1'}})

      setTimeout(() => {
        expect(wrapper.vm.adPhotoOrPlaceHolder()).toBe('')
        done()
      }, 0)
    })

    it('is missing in other user ad', function (done) {
      adWithPropertiesOwnAndPhoto(false, '')

      let wrapper = rmount(Ad, {propsData: {id: '1'}})

      setTimeout(() => {
        expect(wrapper.vm.adPhotoOrPlaceHolder()).toBe('/static/temp/ad-placeholder.png')
        done()
      }, 0)
    })
  })

})
