const { isEmpty } = require('./helpers')

function getField(name, displayName) {
  return { name, displayName: displayName || name }
}

function validateConfig(config) {
  const requiredConfigFields = [
    getField('version'),
    getField('organization'),
    getField('project'),
    getField('token'),
    getField('files')
  ]
  validateRequiredFields(requiredConfigFields, config)

  const requiredFileFields = [
    getField('name', 'files.name'),
    getField('path', 'files.path')
  ]
  config.files.forEach(file => validateRequiredFields(requiredFileFields, file))
}

function validateRequiredFields(fields, object) {
  fields.forEach(field => {
    if (isEmpty(object[field.name])) {
      throw new Error(`${field.displayName} field is required`)
    }
  })
}

module.exports = { validateConfig }
