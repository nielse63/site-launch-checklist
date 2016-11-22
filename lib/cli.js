
'use strict';
import meow from 'meow';
import launchChecklist from './';

const cli = meow(`
    Usage
      $ launch-checklist <input>

    Options
      -u, --url  URL to test

    Examples
      launch-checklist --url http://google.com
`, {
    alias: {
        u: 'url'
    }
});

launchChecklist(cli.flags);