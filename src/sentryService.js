const { getReleaseUrl, getFilesUrl } = require('./helpers')
const { post } = require('./sentryClient')
const ClientError = require('./clientError')

function service(config) {
  const { version, organization, project, token } = config

  function createRelease() {
    return new Promise((resolve, reject) => {
      post(getReleaseUrl(organization, project))
        .setToken(token)
        .setBody({ version })
        .end((error, response) => {
          if (error) {
            if (error instanceof ClientError) {
              const responseError = new Error()
              responseError.data = error.response.body
              return reject(responseError)
            }
            return reject(error)
          }
          const { body } = response
          return resolve(body)
        })
    })
  }
  function uploadFile(file) {
    return new Promise((resolve, reject) => {
      post(getFilesUrl(organization, project, version))
        .setToken(token)
        .attachFile(file)
        .end((error, response) => {
          if (error) {
            if (error instanceof ClientError) {
              const responseError = new Error()
              responseError.data = Object.assign({}, error.response.body, {
                file
              })
              return reject(responseError)
            }
            return reject(error)
          }
          const { body } = response
          return resolve(body)
        })
    })
  }
  return {
    createRelease,
    uploadFile
  }
}

module.exports = service
