# launch-checklist 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Automated launch checklist tests
<hr>

Launch Checklist is a tool for automating the various tasks that go into launching a website.

## Installation
You can install Launch Checklist locally or globally

### Local Installation and Usage
Install Launch Checklist locally if you'd like to include it as part of your project's build system:

```sh
$ npm install --save-dev launch-checklist
```
You can then run Launch Checklist against a URL by referencing the local installation:

```sh
$ ./node_modules/.bin/launch-checklist --url http://website.com
```

### Global Installation and Usage
Installing Launch Checklist globally allows you to run program directly from the command line without referencing a local directory. To install globally:

```sh
$ npm install -g launch-checklist
```
Then execute the command, providing a valid URL:

```sh
$ launch-checklist --url http://website.com
```

## Command Line Interface
The simplest way to use Launch Checklist is from the command line:

```sh
Usage
  $ launch-checklist [options]

Options
  -u, --url     <string> URL to test - default: null
  -f, --format  <string> Output format [table|json] - default: table

Examples
  launch-checklist --url http://google.com --format json
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

* `stylish` (default)
* `table`
* `json`

### Callback

Callback function after all tests have been executed. This gets two parameters:

* `error` - If the checklist experiences an error the given value will be a `string`. Otherwise, the first parameter of the callback will be `null`.
* `data` - If no errors, `object` is given as the second parameter containing the supplied options and the results of the tests.

## Tests
Given a valid URL, Launch Checklist runs a series of tests to check the "launch readiness" of a site. These tests are based on the latest best practices to ensure a smooth an successful site launch. These include:

### Sever Security

Validates the server response headers against two sets of keys:

```
Valid:
- X-XSS-Scripting
- X-Frame-Options

Invalid:
- Server
- X-Pingback
- X-Powered-By
```

If the response headers do not include the `Valid` keys or do include the `Invalid` keys listed above, the test will fail.

#### Resources:

* [Clickjacking Defense Cheatsheet](https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet#Defending_with_X-Frame-Options_Response_Headers)
* [Security Headers](https://kb.sucuri.net/warnings/hardening/headers-x-xss-protection)

### SEO

Looks for various meta data elements found in the `<head>` of the page. In order for the test to pass, the given URL must include:

* A document title
* A meta description
* Canonical Link
* Open Graph tags
* Twitter Card tags

#### Resources:

* [SEO Best Practices](https://www.kyleeggleston.com/seo-best-practices/)
* [Search Engine Journal](https://www.searchenginejournal.com/important-tags-2016-seo/156440/)

### Performance

Runs the URL provided through the [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/) tool, returning website performance data and tips for improvement. In order for this test to pass, the website must score at least 85 out of a possible 100 points determined by Google.

Any suggestions provided by Google on how to improve your score will be included in the output and displayed in the console.

**Note**: This test only checks desktop performance. Mobile performance and usability are also tested through PageSpeed Insights.

#### Resources:

* [About PageSpeed Insights](https://developers.google.com/speed/docs/insights/about)
* [How Website Speed Actually Impacts Search Ranking](https://moz.com/blog/how-website-speed-actually-impacts-search-ranking)

### Analytics

Looks for a valid Google Tag Manager reference within the source code of the given URL. If none is found, the test will fail.

#### Resources:

* [Google Tag Manager Home](https://www.google.com/analytics/tag-manager/)
* [Install Google Analytics via Google Tag Manager](https://support.google.com/analytics/answer/6163791?hl=en)

### HTML Validation

Runs the HTML of the supplied URL through the W3C's [Nu HTML Checker](https://validator.w3.org/nu/about.html) looking for any errors returned. 

If any errors are returned, the test will fail and details about each error will be returned in the output and displayed in the console.

#### Resources:

* [About the Nu HTML Checker](https://validator.w3.org/nu/about.html)
* [Why Validate Markup?](https://validator.w3.org/docs/why.html)

### CSS Validation

Retrieves the styles used on the URL provided and validates the CSS against the W3C's CSS Validator - [Jigsaw](https://jigsaw.w3.org/css-validator/). The style is run against the current CSS3 spec.

If any errors are returned, the test will fail and details about each error will be returned in the output and displayed in the console.

#### Resources:

* [CSS Snapshots](https://www.w3.org/Style/CSS/#specs)
* [Why do you need to validate a website?](https://www.loginradius.com/engineering/need-validate-site-w3c/)

### Mobile

Using the [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/) tool, the given URL is checked specifically for mobile speed and usability. Just like the Performance test, the given URL must score at least an 85 out of a possible 100 in order to pass the test, and there must be no usability errors or warning raised.

Any suggestion for improvement with regards to both speed and usability will be included in the output and displayed in the console.

#### Resources:

* [Mobile Analysis in PageSpeed Insights](https://developers.google.com/speed/docs/insights/mobile)
* [PageSpeed Insight Rules](https://developers.google.com/speed/docs/insights/rules)

### Accessibility

Ensures that the URL given is in compliance with the WCAG 2.0 Accessibility Guidelines. Having a compliant site means that your content is more accessible for people with disabilities, including blindness and low vision, deafness and hearing loss, learning disabilities, cognitive limitations, limited movement, speech disabilities, photosensitivity, etc.

This test uses the HTML CodeSniffer tool to evaluate the markup and determine compliance. Any suggestions for improvement will be included in the output and displayed in the console.

#### Resources:

* [Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/TR/WCAG/)
* [HTML_CodeSniffer](http://squizlabs.github.io/HTML_CodeSniffer/)

### Favicons

Evaluating the HTML source code, this test validates that the URL provided has the appropriate icons references for modern devices to provide a good user experience.

In order to pass this test, the markup must include:

```
Desktop favicon:
<link rel="icon" href="favicon.png">

iOS Touch Icons:
<link rel="apple-touch-icon" sizes="180x180" href="images/ios-icon.png">

Safari Mask SVG:
<link rel="mask-icon" href="mask-icon.svg">

Android Manifest and Theme Color:
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#fff">
```
**Note**: The sources above are just examples and are not evaluated in the test.

#### Resources:

* [Real Favicon Generator](http://realfavicongenerator.net/)
* [Favicon FAQ](http://realfavicongenerator.net/faq)

### Broken Links

This test evaluates all clickable links on the given URL and checks for invalid or broken paths or URLs. If any broken links are found, the test will fail and specify which URLs are broken in the output.

#### Resources:

* [Broken Link Checker](https://www.npmjs.com/package/broken-link-checker)

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
