import {addAuthenticationToken} from '@/gateway'
import userService from '@/services/UserService'

describe('gateway', () => {

  it('adds authentication token', () => {
    let headers = {}
    spyOn(userService, 'user').and.returnValue({token: 'token'})

    let result = addAuthenticationToken('passthrough', headers)

    expect(headers['X-UserId']).toBe('token')
    expect(result).toBe('passthrough')
  })
})