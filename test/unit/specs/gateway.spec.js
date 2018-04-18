import {handleError} from '@/gateway'
import notifications from '@/services/notifications'

describe('gateway', () => {

  it('shows notification in case of error', () => {
    spyOn(notifications, 'e')
    let error = {response: {status: 500}}

    let result = handleError(error)

    expect(result).toEqual(Promise.reject(error))
    expect(notifications.e).toHaveBeenCalledWith('Service not available')
  })

  it('does not show notification in case of displayable error', () => {
    spyOn(notifications, 'e')
    let error = {response: {status: 468, data: {key: 'messageKey'}}}

    let result = handleError(error)

    expect(notifications.e).toHaveBeenCalledWith('messageKey')
    expect(result).toEqual(Promise.reject({key: 'messageKey'}))
  })

  it('redirects to login in case user is not authenticated', () => {
    let error = {response: {status: 401}}

    let result = handleError(error)

    expect(window.$router.push).toHaveBeenCalledWith('/login')
    expect(result).toEqual(Promise.reject(error))
  })
})