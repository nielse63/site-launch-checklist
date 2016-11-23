# launch-checklist [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Automated launch checklist tests

## Installation

```sh
$ npm install -g launch-checklist
```

## CLI

```sh
$ launch-checklist --url http://website.com --format json
```

## Programmatic Usage

```js
const launchChecklist = require('launch-checklist');

launchChecklist({
  url: 'http://website.com',
  format: 'json'
}, (err, data) => {
  // ...
});
```

## API

### options [:Object]
#### options.url [:String] default: null
The URL to test

#### options.format [:String](table|json) default: 'table'
The output format of returned data

### callback [:Function(error, data)]
Callback function executed after all tests have been executed. Returns two paramters:
- error [:null|:String]: Null if the module didn't experience an error; String if there was an error
- data [:Object]: A plain object containing the options used and results of each test run

## Checklist Tests
Given a valid URL, Launch Checklist runs a series of tests to check the "launch readiness" of a site. These tests are based on the latest best practices to ensure a smooth an successful site launch. These include:

## License

Apache-2.0 © [Erik Nielsen](https://312development.com)


[npm-image]: https://badge.fury.io/js/launch-checklist.svg
[npm-url]: https://npmjs.org/package/launch-checklist
[travis-image]: https://travis-ci.org/nielse63/launch-checklist.svg?branch=master
[travis-url]: https://travis-ci.org/nielse63/launch-checklist
[daviddm-image]: https://david-dm.org/nielse63/launch-checklist.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/nielse63/launch-checklist
[coveralls-image]: https://coveralls.io/repos/nielse63/launch-checklist/badge.svg
[coveralls-url]: https://coveralls.io/r/nielse63/launch-checklist
