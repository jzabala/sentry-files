const service = require('./sentryService')
const { validateConfig } = require('./validators')

function upload(config) {
  try {
    validateConfig(config)
  } catch (err) {
    return Promise.reject(err)
  }
  const { createRelease, uploadFile } = service(config)
  console.log(`---- Begin files upload ----`)
  console.log(`Creating release ${config.version}...`)
  return createRelease().then(() =>
    Promise.all(
      config.files.map(file => {
        console.log(`Uploading file: ${file.path} -> ${file.name}`)
        return uploadFile(file)
      })
    )
  )
}

module.exports = {
  upload
}
