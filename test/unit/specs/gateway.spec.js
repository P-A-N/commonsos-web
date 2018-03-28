import router from '@/router'
import {errorHandler} from '@/gateway'
import notifications from '@/services/notifications'

describe('gateway', () => {

  it('shows notification in case of error', () => {
    spyOn(notifications, 'e')
    errorHandler({response: {status: 500}})

    expect(notifications.e).toHaveBeenCalledWith('Service not available')
  })

  it('redirects to login in case user is not authenticated', () => {
    errorHandler({response: {status: 401}})

    expect(router.currentRoute.path).toEqual('/login')
  })
})