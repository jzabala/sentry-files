function createPost() {
  const instance = {
    setToken: jest.fn(() => instance),
    setBody: jest.fn(() => instance),
    attachFile: jest.fn(() => instance),
    end: jest.fn(cb => cb(null, { body: {} }))
  }
  const post = jest.fn(() => instance)
  post.postMockInstance = instance
  return post
}

module.exports = {
  post: createPost()
}
