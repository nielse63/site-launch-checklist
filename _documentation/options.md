---
title: Options
position: 5
---

#### url

Default: `null`

A valid URL string to run the checklist against. **This option is required** and the URL must be publicly available in order for all tests to work. If the URL references a local or protected server, the tests will not execute.

#### format

Default: `stylish`

The output format of the results object. Options currently include:

* [`stylish`](https://raw.githubusercontent.com/nielse63/launch-checklist/master/static/stylish.png)
* [`table`](https://raw.githubusercontent.com/nielse63/launch-checklist/master/static/table.png)
* [`json`](https://raw.githubusercontent.com/nielse63/launch-checklist/master/static/json.png)

Click the links above to see an example.

### Callback

Callback function after all tests have been executed. This gets two parameters:

* `error` - If the checklist experiences an error the given value will be a `string`. Otherwise, the first parameter of the callback will be `null`.
* `data` - If no errors, `object` is given as the second parameter containing the supplied options and the results of the tests.
