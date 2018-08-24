# Launch Checklist

[![Greenkeeper badge](https://badges.greenkeeper.io/nielse63/site-launch-checklist.svg)](https://greenkeeper.io/)

> Automated launch checklist tests

[![NPM version][npm-image]][npm-url]
[![Travis branch][travis-image]][travis-url]
[![Dependency status][david-dm-image]][david-dm-url]
[![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

[npm-url]: https://www.npmjs.com/package/launch-checklist
[npm-image]: https://img.shields.io/npm/v/launch-checklist.svg?style=flat-square
[travis-url]: https://travis-ci.org/nielse63/launch-checklist
[travis-image]: https://img.shields.io/travis/nielse63/launch-checklist/master.svg?style=flat-square
[david-dm-url]: https://github.com/nielse63/launch-checklist/blob/master/package.json
[david-dm-image]: https://img.shields.io/david/nielse63/launch-checklist.svg
[david-dm-dev-url]: https://github.com/nielse63/launch-checklist/blob/master/package.json
[david-dm-dev-image]: https://img.shields.io/david/dev/nielse63/launch-checklist.svg
[coveralls-url]: https://coveralls.io/github/nielse63/launch-checklist
[coveralls-image]: https://img.shields.io/coveralls/nielse63/launch-checklist/master.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/nielse63/launch-checklist
[codeclimate-image]: https://img.shields.io/codeclimate/github/nielse63/launch-checklist.svg?style=flat-square

Launch Checklist is a tool for automating the various tasks that go into launching a website.

## Installation

You can install Launch Checklist locally or globally

### Local Installation and Usage

Install Launch Checklist locally if you'd like to include it as part of your project's build system:

```sh
npm install --save-dev launch-checklist
```

You can then run Launch Checklist against a URL by referencing the local installation:

```sh
./node_modules/.bin/launch-checklist http://website.com
```

### Global Installation and Usage

Installing Launch Checklist globally allows you to run program directly from the command line without referencing a local directory. To install globally:

```sh
npm install -g launch-checklist
```

Then execute the command, providing a valid URL:

```sh
launch-checklist http://website.com
```

## Command Line Interface

The simplest way to use Launch Checklist is from the command line:

### Usage

```sh
$ launch-checklist [options]

Options
  -f, --format  <string> Output format [stylish|table|json] - default: stylish

Examples
  launch-checklist --format json http://google.com
```

## Programmatic Usage

You can also include Launch Checklist in your project to validate websites using the Node.js API:

```js
const launchChecklist = require('launch-checklist');

launchChecklist({
  url: 'http://website.com',
  format: 'json'
}, (err, data) => {
  // ...
});
```

### Options

#### url

Default: `null`

A valid URL string to run the checklist against. **This option is required** and the URL must be publicly available in order for all tests to work. If the URL references a local or protected server, the tests will not execute.

#### format

Default: `stylish`

The output format of the results object. Options currently include:

* `stylish` (default)![](https://raw.githubusercontent.com/nielse63/launch-checklist/master/static/stylish.png)
* `table`![](https://raw.githubusercontent.com/nielse63/launch-checklist/master/static/table.png)
* `json`![](https://raw.githubusercontent.com/nielse63/launch-checklist/master/static/json.png)

### Callback

Callback function after all tests have been executed. This gets two parameters:

* `error` - If the checklist experiences an error the given value will be a `string`. Otherwise, the first parameter of the callback will be `null`.
* `data` - If no errors, `object` is given as the second parameter containing the supplied options and the results of the tests.

## Tests

[Check the wiki](https://github.com/nielse63/launch-checklist/wiki) to see all tests performed by this module:

* [Accessibility](https://github.com/nielse63/launch-checklist/wiki/Accessibility)
* [Analytics](https://github.com/nielse63/launch-checklist/wiki/Analytics)
* [Broken Links](https://github.com/nielse63/launch-checklist/wiki/Broken-Links)
* [CSS Validation](https://github.com/nielse63/launch-checklist/wiki/CSS-Validation)
* [Desktop Performance](https://github.com/nielse63/launch-checklist/wiki/Desktop-Performance)
* [Favicons](https://github.com/nielse63/launch-checklist/wiki/Favicons)
* [HTML Validation](https://github.com/nielse63/launch-checklist/wiki/HTML-Validation)
* [Mobile Performance/Usability](https://github.com/nielse63/launch-checklist/wiki/Mobile-Performance-Usability)
* [SEO](https://github.com/nielse63/launch-checklist/wiki/SEO)
* [Server Security](https://github.com/nielse63/launch-checklist/wiki/Server-Security)

## License

Apache-2.0 © [Erik Nielsen](https://312development.com)
