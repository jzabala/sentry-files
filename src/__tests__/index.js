const { upload } = require('../')
const sentryClientMock = require('../sentryClient')
const ClientError = require('../clientError')

jest.mock('../sentryClient')

const config = {
  version: '1.0.0',
  organization: 'TEST_ORGANIZATION',
  project: 'TEST_PROJECT',
  token: 'TEST_TOKEN',
  files: [
    {
      name: 'TEST_FILE_NAME',
      path: 'TEST_FILE_PATH'
    },
    {
      name: 'TEST_FILE_NAME_1',
      path: 'TEST_FILE_PATH_1'
    }
  ]
}

test('returns rejected promise for undefined version', () => {
  expect.assertions(1)
  const newConfig = Object.assign({}, config, {
    version: undefined
  })
  return upload(newConfig).catch(err =>
    expect(err.message).toBe('version field is required')
  )
})
test('returns rejected promise for null organization', () => {
  expect.assertions(1)
  const newConfig = Object.assign({}, config, {
    organization: null
  })
  return upload(newConfig).catch(err =>
    expect(err.message).toBe('organization field is required')
  )
})
test('returns rejected promise for empty project', () => {
  expect.assertions(1)
  const newConfig = Object.assign({}, config, {
    project: ''
  })
  return upload(newConfig).catch(err =>
    expect(err.message).toBe('project field is required')
  )
})
test('returns rejected promise for null token', () => {
  expect.assertions(1)
  const newConfig = Object.assign({}, config, {
    token: null
  })
  return upload(newConfig).catch(err =>
    expect(err.message).toBe('token field is required')
  )
})
test('returns rejected promise for empty files', () => {
  expect.assertions(1)
  const newConfig = Object.assign({}, config, {
    files: []
  })
  return upload(newConfig).catch(err =>
    expect(err.message).toBe('files field is required')
  )
})
test('uploads files successfully', () => {
  return upload(config).then(() => {
    expect(sentryClientMock.post).toHaveBeenCalledTimes(3)
    expect(sentryClientMock.post).toHaveBeenNthCalledWith(
      1,
      '/api/0/projects/TEST_ORGANIZATION/TEST_PROJECT/releases/'
    )
    expect(sentryClientMock.post).toHaveBeenNthCalledWith(
      2,
      '/api/0/projects/TEST_ORGANIZATION/TEST_PROJECT/releases/1.0.0/files/'
    )

    const mockSetToken = sentryClientMock.post.postMockInstance.setToken
    expect(mockSetToken).toHaveBeenCalledTimes(3)
    expect(mockSetToken).toHaveBeenNthCalledWith(1, config.token)
    expect(mockSetToken).toHaveBeenNthCalledWith(2, config.token)
    expect(mockSetToken).toHaveBeenNthCalledWith(3, config.token)

    const mockSetBody = sentryClientMock.post.postMockInstance.setBody
    expect(mockSetBody).toHaveBeenCalledTimes(1)
    expect(mockSetBody).toHaveBeenCalledWith({ version: config.version })

    const mockAttachFile = sentryClientMock.post.postMockInstance.attachFile
    expect(mockAttachFile).toHaveBeenCalledTimes(2)
    expect(mockAttachFile).toHaveBeenNthCalledWith(1, config.files[0])
    expect(mockAttachFile).toHaveBeenNthCalledWith(2, config.files[1])
  })
})
test('throws error creating release', () => {
  expect.assertions(1)
  const body = { details: 'Error creating release' }
  sentryClientMock.post.postMockInstance.end.mockImplementationOnce(cb =>
    cb(new ClientError({ body }))
  )
  return upload(config).catch(err => {
    expect(err.data).toBe(body)
  })
})
test('throws error creating file', () => {
  expect.assertions(1)
  const body = { details: 'Error uploading file' }

  // first call of the client is to create the release
  const mockEnd = sentryClientMock.post.postMockInstance.end
  let calls = 0
  mockEnd.mockImplementation(cb => {
    if (calls === 1) {
      cb(new ClientError({ body }))
    }
    calls++
    cb(null, { body: {} })
  })
  const expected = Object.assign({}, body, { file: config.files[0] })
  return upload(config).catch(err => {
    expect(err.data).toEqual(expected)
    mockEnd.mockRestore()
  })
})
