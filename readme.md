# WordPress Launch Checklist

> Validates a WordPress site against common launch-checklist tests.

## Status

[![Build Status](https://travis-ci.org/nielse63/launch-checklist.svg?branch=master)](http://travis-ci.org/nielse63/launch-checklist)
[![Code Climate](https://codeclimate.com/github/nielse63/launch-checklist/badges/gpa.svg)](https://codeclimate.com/github/nielse63/launch-checklist)
[![Test Coverage](https://codeclimate.com/github/nielse63/launch-checklist/badges/coverage.svg)](https://codeclimate.com/github/nielse63/launch-checklist/coverage)


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


## TEST

Testing is provided by Mocha.

Either run in bash `$ npm test` or the full command `$ ./node_modules/.bin/mocha --reporter spec`.

![MOCHA TEST](https://raw.githubusercontent.com/nielse63/launch-checklist/master/src/reporters/html/test.jpg "MOCHA TEST")


## LICENSE

(MIT License)

Copyright (c) 2016 Erik Nielsen <erik@312development.com>

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
