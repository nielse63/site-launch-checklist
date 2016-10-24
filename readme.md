# WordPress Launch Checklist [![Build Status](https://secure.travis-ci.org/sdeering/npm-boilerplate.png)](http://travis-ci.org/sdeering/npm-boilerplate)

> Validates a WordPress site against common launch-checklist tests.


## Installing

```
$ npm install launch-checklist --save-dev
```


## Usage

```
const checklist = require('launch-checklist');

// Returns basic information about the site being validated
checklist.getSiteInfo().then(data => {
	// ...
});

// Runs all site-launch tests
checklist.run();
checklist.on('tests:complete', data => {
	// ...
});

```


## Example Usage

```
var ModuleName = require('your-npm-package-name'); //or npm package name
console.log(ModuleName.functionName());
```


## TEST

Testing is provided by Mocha.

Either run in bash `$ npm test` or the full command `$ ./node_modules/.bin/mocha --reporter spec`.

![MOCHA TEST](https://raw.githubusercontent.com/nielse63/launch-checklist/master/test/test.jpg "MOCHA TEST")


## LICENSE

(MIT License)

Copyright (c) 2014 sdeering <samdeering@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
