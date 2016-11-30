#!/usr/bin/env node

import program from 'commander'
import launchChecklist from './'

program
  .arguments('<url>')
  .option('-f, --format <format>', 'output format. options are: stylish (default), table, or json')
  .action((url) => {
    const format = program.format || 'stylish'
    launchChecklist({
      url,
      format,
    }, (err) => {
      if (err) {
        throw new Error(err)
      }
    })
  })
  .parse(process.argv)
