# TODO Items

* Write more functional tests
* Move conf files into seperate folders
* Create timeout systems
* Better documentation
  - Use jsdoc
  - Make code coverage figures available
* Install analytics usage(?)
  - Perhaps using sentinal and raven js
* Instal memory leak/usage profiling
* Create way to cache results
  - Create a locally stored json file
  - JSON file will have URLs as keys
  - Value for the key should be an encoded value determining if the page has changed
  - If the page/url being checked hasn't changed since the last time it was validated, return the same results as previously
