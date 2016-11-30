#!/usr/bin/env node

import program from 'commander'
import launchChecklist from './'

 program
  .arguments('<url>')
  .option('-f, --format <format>', 'output format. options are: stylish (default), table, or json')
  .action((url) => {
    const format = program.format || 'stylish'
    // console.log({
    //   url : url,
    //   format : format
    // })
    launchChecklist({
      url : url,
      format : format
    }, (err) => {
      if( err ) {
        throw new Error(err)
      }
    })
  })
  .parse(process.argv);

// const cli = meow(`
//     Usage
//       $ launch-checklist <url> [format]

//     Options
//       -u, --url     URL to test - default: null
//       -f, --format  Output format [table|json] - default: table

//     Examples
//       launch-checklist --url http://google.com --format json
// `, {
//   alias: {
//     u: 'url',
//     f: 'format',
//   },
// })

// launchChecklist(cli.flags)
