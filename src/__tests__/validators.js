const { validateConfig } = require('../validators')

describe('validateConfig', () => {
  const config = {
    version: 'TEST_VERSION',
    organization: 'TEST_ORGANIZATION',
    project: 'TEST_PROJECT',
    token: 'TEST_TOKEN',
    files: [
      {
        name: 'TEST_FILE_NAME',
        path: 'TEST_FILE_PATH'
      }
    ]
  }
  test('version field is required', () => {
    const newConfig = Object.assign({}, config, {
      version: undefined
    })
    expect(() => validateConfig(newConfig)).toThrow('version field is required')
  })
  test('organization field is required', () => {
    const newConfig = Object.assign({}, config, {
      organization: undefined
    })
    expect(() => validateConfig(newConfig)).toThrow(
      'organization field is required'
    )
  })
  test('project field is required', () => {
    const newConfig = Object.assign({}, config, {
      project: undefined
    })
    expect(() => validateConfig(newConfig)).toThrow('project field is required')
  })
  test('token field is required', () => {
    const newConfig = Object.assign({}, config, {
      token: undefined
    })
    expect(() => validateConfig(newConfig)).toThrow('token field is required')
  })
  test('files field is required', () => {
    const newConfig = Object.assign({}, config, {
      files: undefined
    })
    expect(() => validateConfig(newConfig)).toThrow('files field is required')
  })
  test('files.name field is required', () => {
    const newConfig = Object.assign({}, config, {
      files: [
        {
          path: 'TEST_FILE_PATH'
        }
      ]
    })
    expect(() => validateConfig(newConfig)).toThrow(
      'files.name field is required'
    )
  })
  test('files.path field is required', () => {
    const newConfig = Object.assign({}, config, {
      files: [
        {
          name: 'OTHER_TEST_FILE_NAME'
        }
      ]
    })
    expect(() => validateConfig(newConfig)).toThrow(
      'files.path field is required'
    )
  })
  test('does not throw exception', () => {
    expect(() => validateConfig(config)).not.toThrow()
  })
})
