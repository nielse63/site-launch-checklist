wp about
===========

This package that implements the `wp about` command for [WP-CLI](http://wp-cli.org).

It returns information about the wordpress installation and environment.
By default (no parameters) it returns all information formatted and colourized.
It can also be used to return 'information fragments'. With a fully parameterized command line it only returns the one piece of data requested.
See `wp-cli help about` for full documentation.


While various other commands return information the aim of this command is to be purely informational and to consolidate all the information under one command.

### Requirements

* As per [WP-CLI](http://wp-cli.org).

### Installation of the package

#### Directly. i.e Not using Composer

Download it or clone it.

```
cd ~/.wp-cli
mkdir commands
git clone https://github.com/sinebridge/wp-cli-about.git commands/about
```

Create or update the `config.yml` file so that it looks like this:

```
require:
  - commands/about/about.php
```

#### Using Composer

**Note: Need clarity on this, but currently should only be used if you have NOT installed 'wp' globally at `/usr/bin/wp` as it seems to cause a conflict.**


First, make sure you have the [package index](https://github.com/wp-cli/wp-cli/wiki/Community-Packages#setting-up-the-package-index) configured:

Then, just install the package:

```
php composer.phar require sinebridge/wp-cli-about=dev-master
```

### Usage

Just run it:
```
$ wp about
$ wp about --site
$ wp about --db
```

###### Example output:
    --------------------------------------------------
    - Site Information
    - Site Title          : Sinebridge
    - Tagline             : Cloud Architecture, Design &amp; Development
    - Wp Address (URL)    : http://sinebridge.com
    - Site Address (URL)  : http://sinebridge.com
    - E-mail Address      : support@sinebridge.com
    - Current theme name  : sinebridge

    --------------------------------------------------
    - Database Information
    - Hostname            : 127.0.0.1
    - Database Name       : database-name
    - Username            : database-username
    - Password            : ****************

    --------------------------------------------------
    - Miscellaneous Environment Information
    - Wordpress version   : 3.8.1
    - Database revision   : 26691
    - Multisite install   : false

    - PHP version         : 5.5.x-xx

    - OS Hostname         : localhost
    - OS Type             : Linux
    - OS Version          : #49-Ubuntu SMP Tue Nov 12 18:00:10 UTC 2013
    - OS Release          : 3.8.0-34-generic
    - Machine type        : x86_64


