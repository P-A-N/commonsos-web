import {addAuthenticationToken} from '@/gateway'
import userService from '@/services/UserService'

describe('gateway', () => {

  it('adds authentication token if available', () => {
    let headers = {}
    spyOn(userService, 'user').and.returnValue({token: 'token'})

    let result = addAuthenticationToken('passthrough', headers)

    expect(headers['X-UserId']).toBe('token')
    expect(result).toBe('passthrough')
  })

  it('ignores missing authentication token', () => {
    let headers = {}
    spyOn(userService, 'user').and.returnValue(null)

    let result = addAuthenticationToken('passthrough', headers)

    expect(headers).toEqual({})
    expect(result).toBe('passthrough')
  })
})