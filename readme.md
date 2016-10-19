# NPM Boilerplate [![Build Status](https://secure.travis-ci.org/sdeering/npm-boilerplate.png)](http://travis-ci.org/sdeering/npm-boilerplate)

> A good starting point for your new Node.js NPM packages.


## Create a new package

1. `$ git clone git@github.com:sdeering/npm-boilerplate.git`
2. `$ mv npm-boilerplate <your-npm-package-name>`
3. `$ cd <your-npm-package-name>`

Then change the following fields below to adhere to [NPM package rules](https://www.npmjs.org/doc/misc/npm-developers.html#What-is-a-package).


## NPM Policies

 * Update `package.json`: name, version, description, keywords, homepage, author, repository, main, licenses.

[Read more about package.json fields](https://www.npmjs.org/doc/files/package.json.html).


## Customise

Some things you might want to change/update.

 * Change Node.js versions for test in `.travis.yml`.
 * Change `LICENCE`.
 * Change `README`.


## Example Usage

```
var ModuleName = require('your-npm-package-name'); //or npm package name
console.log(ModuleName.functionName());
```


## TEST

Testing is provided by MOCHA.

Either run in bash `$ npm test` or the full command `$ ./node_modules/.bin/mocha --reporter spec`.

![MOCHA TEST](https://raw.githubusercontent.com/sdeering/npm-boilerplate/master/test/npm-boilerplate-test.jpg "MOCHA TEST")


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
