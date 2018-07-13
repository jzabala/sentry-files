class ClientError extends Error {
  constructor(response, ...params) {
    super(params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError)
    }
    this.response = response
  }
}

module.exports = ClientError
