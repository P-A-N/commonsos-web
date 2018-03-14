import {addAuthenticationToken} from '@/gateway'

describe('gateway', () => {

  it('adds authentication token', () => {
    let headers = {}
    let data = 'data'
    localStorage.setItem('user', 'john')

    let result = addAuthenticationToken(data, headers)

    expect(result).toBe(data)
    expect(headers['X-UserId']).toBe('john')
  })
})