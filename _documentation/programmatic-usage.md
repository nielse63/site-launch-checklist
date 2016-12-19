---
title: Programmatic Usage
position: 4
right_code: |
  ~~~ javascript
  const launchChecklist = require('launch-checklist');

  launchChecklist({
    url: 'http://website.com',
    format: 'json'
  }, (err, data) => {
    // ...
  });
  ~~~
  {: title="JavaScript Usage" }
---

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
