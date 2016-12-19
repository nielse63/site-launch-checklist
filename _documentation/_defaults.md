---
title:
position:
type:
description:
right_code:
---

Welcome to our API.

This API document is designed for those interested in developing for our platform.

This API is still under development and will evolve.

You'll succeed if you do this.
{: .success }

Here's some useful information.
{: .info }

Something may not happen if you try and do this.
{: .warning }

Something bad will happen if you do this.
{: .error }

| Code | Name        | Description                      |
|------|-------------|----------------------------------|
| 200  | OK          | Success                          |
| 201  | Created     | Creation Successful              |
| 400  | Bad Request | We could not process that action |
| 403  | Forbidden   | We couldn't authenticate you     |

All errors will return JSON in the following format:

~~~ json
{
  "error": true,
  "message": "error message here"
}
~~~

