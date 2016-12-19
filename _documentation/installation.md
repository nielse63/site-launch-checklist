---
title: Installation
position: 2
right_code: |
  ~~~ sh
  npm install -g launch-checklist
  ~~~
  {: title="Installation" }
---

### Global Installation and Usage

Installing Launch Checklist globally allows you to run program directly from the command line without referencing a local directory. To install globally:

```sh
npm install -g launch-checklist
```

Then execute the command, providing a valid URL:

```sh
launch-checklist http://website.com

### Local Installation and Usage

Install Launch Checklist locally if you'd like to include it as part of your project's build system or use the JavaScript API:

```sh
npm install --save-dev launch-checklist
```

You can then run Launch Checklist against a URL by referencing the local installation:

```sh
./node_modules/.bin/launch-checklist http://website.com
```
