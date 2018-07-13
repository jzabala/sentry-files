const service = require('./sentryService')

function upload(config) {
  const { createRelease, uploadFile } = service(config)
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
