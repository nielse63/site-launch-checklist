#!/bin/bash

# versions
OLD_VERSION="0_0_0"
VERSION="0_0_1"

# commands
CWD=$(pwd)
DOC_ROOT="$CWD/test/sample"
WP="$CWD/bin/wp --path=$DOC_ROOT"
PHP=$(which php)
MYSQL=$(which mysql)

SITE_URL="localhost:8080"
SITE_TITLE="Launch Checklist Test"

ADMIN_USER=admin
ADMIN_PASS=$(openssl rand -base64 8)
ADMIN_EMAIL=erik@312development.com

OLD_DB_NAME=slc_test_$OLD_VERSION
DB_NAME=slc_test_$VERSION

# check for executables
if [ ! -e "$PHP" ]; then
	echo "No php executable found - make sure php can be found in your $PATH."
	echo "Exiting"
	exit 1
fi
if [ ! -e "$MYSQL" ]; then
	echo "No mysql executable found - make sure mysql can be found in your $PATH."
	echo "Exiting"
	exit 1
fi

# load environment variables
ENV="$(pwd)/.env"
if [ ! -e "$ENV" ]; then
	echo "No env file found."
	# echo "Database name:"
	# read DB_NAME
	echo "Database user:"
	read DB_USER
	echo "Database user password:"
	read DB_PASS
	echo "Host:"
	read DB_HOST
else
	while IFS='' read -r line || [[ -n "$line" ]]; do
		if [ -n "$line" ] && [[ $line != \#* ]]; then
			export $line
		fi
	done < $ENV
fi

# functions
remove_dir() {
	if [ -d "$DOC_ROOT" ]; then
		rm -rf "$DOC_ROOT"
	fi
}

# load environment variables
if [ -z "$DB_USER" ]; then
	echo "DB_USER is not found. Returning."
	exit
fi

# Remove and create directory
remove_dir
mkdir "$DOC_ROOT"

# Install locally
$WP core download
echo "=> Downloaded core"

# delete the test database if one is found
$MYSQL -h $DB_HOST -u$DB_USER -p$DB_PASS -e "DROP DATABASE IF EXISTS $OLD_DB_NAME; DROP DATABASE IF EXISTS $DB_NAME; CREATE DATABASE IF NOT EXISTS $DB_NAME;"
echo "=> Created database"

# configure wp build
OUTPUT=$($WP core config --dbname=$DB_NAME --dbuser=$DB_USER --dbpass=$DB_PASS --dbhost=$DB_HOST)
echo $OUTPUT
if [[ "$OUTPUT" == "ERROR*" ]]; then
	echo "THERE WAS AN ERROR"
	echo $OUTPUT
	remove_dir
	exit
fi

# install
$WP core install \
	--url="$SITE_URL" \
	--title="$SITE_TITLE" \
	--admin_user="$ADMIN_USER" \
	--admin_password="$ADMIN_PASS" \
	--admin_email="$ADMIN_EMAIL"

# install plugins
$WP plugin install all-in-one-wp-security-and-firewall
$WP plugin install w3-total-cache
$WP plugin activate --all

# create server
$PHP -S $SITE_URL -t $DOC_ROOT
