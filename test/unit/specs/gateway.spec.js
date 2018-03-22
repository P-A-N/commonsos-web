import {addAuthenticationToken} from '@/gateway'
import userService from '@/services/UserService'

describe('gateway', () => {

  it('adds authentication token', () => {
    let headers = {}
    let data = 'data'
    spyOn(userService, 'user').and.returnValue({userName: 'john'})

    let result = addAuthenticationToken(data, headers)

    expect(result).toBe(data)
    expect(headers['X-UserId']).toBe('john')
  })
})