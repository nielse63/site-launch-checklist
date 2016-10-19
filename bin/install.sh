#!/bin/bash

CURL=$(which curl)
CWD="$(pwd)/bin"
PHP=$(which php)
PHAR="$CWD/wp-cli.phar"
WP="$CWD/wp"
COMMANDS="$CWD/commands"

# rm -f $WP
echo $WP
# rm -rf $COMMANDS

cd $CWD
# if [ ! -d "$COMMANDS" ]; then
# 	mkdir $COMMANDS
# fi

if [ ! -e "$WP" ]; then
	$CURL -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

	### commands
	git clone https://github.com/sinebridge/wp-cli-about.git commands/about

	# if [ -d "/Applications/MAMP/bin/php" ]; then
	# 	PHP_VERSION=$(ls "/Applications/MAMP/bin/php" | sort -n | tail -1)
	# 	STRING="export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:\$PATH"
	# 	echo "$STRING" >> ~/.bash_profile
	# 	source ~/.bash_profile
	# fi

	chmod +x $PHAR
	# mv $PHAR $WP
	cp $PHAR $WP
	$WP --info
fi
