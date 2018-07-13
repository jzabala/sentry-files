function getReleaseUrl(account, project) {
  if (!account) throw new Error('account param is required')
  if (!project) throw new Error('project param is required')
  return `/api/0/projects/${account}/${project}/releases/`
}

function getFilesUrl(account, project, version) {
  if (!version) throw new Error('version param is required')
  const releaseUrl = getReleaseUrl(account, project)
  return `${releaseUrl}${version}/files/`
}

module.exports = {
  getReleaseUrl,
  getFilesUrl
}
