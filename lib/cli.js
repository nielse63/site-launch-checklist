
import meow from 'meow'
import launchChecklist from './'

const cli = meow(`
    Usage
      $ launch-checklist <url> [format]

    Options
      -u, --url     URL to test - default: null
      -f, --format  Output format [table|json] - default: table

    Examples
      launch-checklist --url http://google.com --format json
`, {
  alias: {
    u: 'url',
    f: 'format',
  },
})

launchChecklist(cli.flags)
