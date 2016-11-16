<?php

parse_str(implode('&', array_slice($argv, 1)), $_GET);

// vars
$output = [];

// functions
function get_db()
{
	return [
		'host' => DB_HOST,
		'name' => DB_NAME,
		'username' => DB_USER,
		'password' => str_repeat('*', strlen(DB_PASSWORD)),
	];
}

function get_env()
{
	$versions_path = ABSPATH . 'wp-includes/version.php';
	if ( ! is_readable( $versions_path ) ) {
		return;
	}

	include $versions_path;

	return [
		'wp_version'   => $wp_version,
		'db_version'   => $wp_db_version,
		"php_version"  => PHP_VERSION,
		"os_hostname"  => php_uname('n'),
		"os_type"      => php_uname('s'),
		"os_version"   => php_uname('v'),
		"os_release"   => php_uname('r'),
		"machine_type" => php_uname('m'),
		"ip_address"   => $_SERVER['REMOTE_ADDR'],
	];
}

function get_site()
{
	$keys = [
		'blogname'        => 'Site Title',
		'blogdescription' => 'Tagline',
		'siteurl'         => 'Wp Address (URL)',
		'home'            => 'Site Address (URL)',
		'admin_email'     => 'E-mail Address',
		'template'        => 'Current theme name'
	];

	$return_val = [];
	foreach($keys as $key => $desc) {
		$return_val[$key] = get_option( $key );
	}

	return $return_val;
}

// get data
if( isset( $_GET['config'] ) ) {
	$wp_config = $_GET['config'];
	if( ! file_exists( $wp_config ) ) {
		echo 'That path given for the wp-config.php file does not exist.';
	}

	// include the config file
	require_once $wp_config;

	// get info
	$output['db']   = get_db();
	$output['env']  = get_env();
	$output['site'] = get_site();

	header('Content-type: application/json');
	echo json_encode($output);
} else {
	exit;
}

exit;
