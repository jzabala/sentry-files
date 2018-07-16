const { getReleaseUrl, getFilesUrl } = require('../helpers')

describe('getReleaseUrl', () => {
  const organization = 'testing-organization'
  const project = 'testing-project'
  test('returns sentry release url for params', () => {
    const actual = getReleaseUrl(organization, project)
    expect(actual).toMatchSnapshot()
  })
  test('throws if organization is not provided', () => {
    expect(() => getReleaseUrl(null, project)).toThrow(
      'organization param is required'
    )
  })
  test('throws if project is not provided', () => {
    expect(() => getReleaseUrl(organization, null)).toThrow(
      'project param is required'
    )
  })
})

describe('getFilesUrl', () => {
  const organization = 'testing-organization'
  const project = 'testing-project'
  const version = '1.0.0'
  test('returns sentry files url for params', () => {
    const actual = getFilesUrl(organization, project, version)
    expect(actual).toMatchSnapshot()
  })
  test('throws if organization is not provided', () => {
    expect(() => getFilesUrl(null, project, version)).toThrow(
      'organization param is required'
    )
  })
  test('throws if project is not provided', () => {
    expect(() => getFilesUrl(organization, null, version)).toThrow(
      'project param is required'
    )
  })
  test('throws if version is not provided', () => {
    expect(() => getFilesUrl(organization, project, null)).toThrow(
      'version param is required'
    )
  })
})
