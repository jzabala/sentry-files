function getReleaseUrl(organization, project) {
  if (!organization) throw new Error('organization param is required')
  if (!project) throw new Error('project param is required')
  return `/api/0/projects/${organization}/${project}/releases/`
}

function getFilesUrl(organization, project, version) {
  if (!version) throw new Error('version param is required')
  const releaseUrl = getReleaseUrl(organization, project)
  return `${releaseUrl}${version}/files/`
}

module.exports = {
  getReleaseUrl,
  getFilesUrl
}
