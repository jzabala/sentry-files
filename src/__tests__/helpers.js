const { getReleaseUrl, getFilesUrl } = require('../helpers')

describe('getReleaseUrl', () => {
  const account = 'testing-account'
  const project = 'testing-project'
  test('returns sentry release url for params', () => {
    const actual = getReleaseUrl(account, project)
    expect(actual).toMatchSnapshot()
  })
  test('throws if account is not provided', () => {
    expect(() => getReleaseUrl(null, project)).toThrow(
      'account param is required'
    )
  })
  test('throws if project is not provided', () => {
    expect(() => getReleaseUrl(account, null)).toThrow(
      'project param is required'
    )
  })
})

describe('getFilesUrl', () => {
  const account = 'testing-account'
  const project = 'testing-project'
  const version = '1.0.0'
  test('returns sentry files url for params', () => {
    const actual = getFilesUrl(account, project, version)
    expect(actual).toMatchSnapshot()
  })
  test('throws if account is not provided', () => {
    expect(() => getFilesUrl(null, project, version)).toThrow(
      'account param is required'
    )
  })
  test('throws if project is not provided', () => {
    expect(() => getFilesUrl(account, null, version)).toThrow(
      'project param is required'
    )
  })
  test('throws if version is not provided', () => {
    expect(() => getFilesUrl(account, project, null)).toThrow(
      'version param is required'
    )
  })
})
