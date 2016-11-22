// #!/usr/bin/env node

'use strict';

import meow from 'meow';
import launchChecklist from './';

var cli = meow([
  'Usage',
  '  $ launch-checklist [input]',
  '',
  'Options',
  '  --url  Lorem ipsum. [Default: false]',
  '',
  'Examples',
  '  $ launch-checklist',
  '  unicorns',
  '  $ launch-checklist rainbows',
  '  unicorns & rainbows'
]);
