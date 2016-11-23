
'use strict';
import meow from 'meow';
import launchChecklist from './';

const cli = meow(`
    Usage
      $ launch-checklist <input>

    Options
      -u, --url     URL to test - default: null
      -f, --format  Output format [table|json] - default: table

    Examples
      launch-checklist --url http://google.com --format json
`, {
    alias: {
        u: 'url'
    }
});

launchChecklist(cli.flags);
