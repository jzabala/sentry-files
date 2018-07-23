# sentry-files

Zero-dependency Node library to upload source maps to Sentry

## Installation

```bash
yarn add sentry-files --dev
```

## Usage

```js
import path from 'path';
const { upload } = require('sentry-files');

const config = {
  version: '1.0.0',
  organization: 'example-organization',
  project: 'example-project',
  token: 'YOUR_API_TOKEN_HERE',
  files: [
    {
      name: 'http://example.com/assets/main.js.map',
      path: path.resolve(__dirname, 'path/to/main.js.map'),
    },
  ],
};

upload(config)
  .then(data => console.log('----- SUCCESS ----\n', data))
  .catch(error => console.log('---- ERROR ----\n', error));
```

For an example uploading source maps of a React app check this [post](https://medium.com/@johnny02/configure-sentry-with-source-maps-for-a-react-app-badf1ac0bbe8).

## API

### `upload(options)`

Type: `function`\
Returns: `Promise`

It creates a release and uploads the files to that release.

### `options`

Type: `Object`\
_Required_

An object specifying the options used to create the release and upload the files.

### `options.version`

Type: `String`\
_Required_

Version used to create the release.

### `options.organization`

Type: `String`\
_Required_

Sentry organization name.

### `options.project`

Type: `String`\
_Required_

Sentry project name.

### `options.token`

Type: `String`\
_Required_

[Authentication token](https://docs.sentry.io/api/auth/) required to perform actions against the Sentry API.

_Ensure you have `project:write` selected under scopes._

### `options.files`

Type: `Array`\
_Required_

Array of objects describing the files to upload to Sentry.

```js
[
  {
    name: 'Sentry file name',
    path: 'Local file path'
  },
  {
    name: '...',
    path: '...'
  }
…]
```

### `options.files.name`

Type: `String`\
_Required_

Name of the file on Sentry.

_More about Sentry file names: [Upload a New File](https://docs.sentry.io/api/releases/post-organization-release-files/), [Uploading Source Maps to Sentry](https://docs.sentry.io/clients/javascript/sourcemaps/#uploading-source-maps-to-sentry) and [Assets Accessible at Multiple Origins](https://docs.sentry.io/clients/javascript/sourcemaps/#assets-multiple-origins)_

### `options.files.path`

Type: `String`\
_Required_

Path to the file locally.

## License

#### [MIT](./LICENSE)
