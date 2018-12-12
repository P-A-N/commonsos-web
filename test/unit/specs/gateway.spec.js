import {handleError} from '@/gateway'
import notifications from '@/services/notifications'
import i18n from '@/i18n'
import userService from '@/services/UserService'

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
    spyOn(i18n, 't').and.returnValue('translated message')

    let result = handleError(error)

    expect(notifications.e).toHaveBeenCalledWith('translated message')
    expect(result).toEqual(Promise.reject({key: 'messageKey'}))
  })

  it('redirects to login in case user is not authenticated', () => {
    spyOn(userService, 'logout')
    let error = {response: {status: 401}}

    let result = handleError(error)

    expect(userService.logout).toHaveBeenCalled()
    expect(result).toEqual(Promise.reject(error))
  })
})