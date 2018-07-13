const https = require('https')
const fs = require('fs')
const ClientError = require('./clientError')

function post(path) {
  let headers = {
    Accept: 'application/json'
  }
  const options = {
    hostname: 'sentry.io',
    port: 443,
    path,
    method: 'POST'
  }
  let requestBody = null

  function _addHeaders(newHeaders) {
    headers = Object.assign({}, headers, newHeaders)
  }
  const instance = {}
  instance.setToken = token => {
    _addHeaders({ Authorization: `Bearer ${token}` })
    return instance
  }
  instance.attachFile = file => {
    const boundary = `--${Math.random().toString(16)}`
    requestBody = buildBodyForFiles(boundary, file)
    _addHeaders({
      'Content-Type': 'multipart/form-data; boundary=' + boundary,
      'Content-Length': requestBody.length
    })
    return instance
  }
  instance.setBody = data => {
    requestBody = JSON.stringify(data)
    _addHeaders({ 'Content-Type': 'application/json' })
    return instance
  }
  instance.end = cb => {
    const requestOptions = Object.assign({}, options, { headers })
    const req = https.request(requestOptions, res => {
      let body = ''
      res.on('data', chunk => {
        body += chunk
      })
      res.on('end', () => {
        const { statusCode } = res
        const response = {
          statusCode,
          body: JSON.parse(body)
        }
        if (res.statusCode >= 200 && res.statusCode <= 300) {
          cb(null, response)
        } else {
          cb(new ClientError(response))
        }
      })
    })
    req.on('error', e => {
      cb(e)
    })
    req.write(requestBody)
    req.end()
  }
  return instance
}

function buildBodyForFiles(boundary, file) {
  const crlf = '\r\n'
  const delimiter = `${crlf}--${boundary}`
  const closeDelimiter = `${delimiter}--`

  const data = fs.readFileSync(file.path)
  return Buffer.concat([
    Buffer.from(
      `${delimiter} ${crlf} Content-Disposition: form-data; name="file"; filename="${
        file.name
      }"${crlf}${crlf}`
    ),
    data,
    Buffer.from(closeDelimiter)
  ])
}

module.exports = {
  post
}
