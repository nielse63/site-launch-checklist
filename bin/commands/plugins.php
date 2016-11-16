<?php

parse_str(implode('&', array_slice($argv, 1)), $_GET);

// vars
$output = [];

// functions
function get_wp_plugins()
{
	if ( ! function_exists( 'get_plugins' ) ) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
	}
	return get_plugins();
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
	$output = get_wp_plugins();

	header('Content-type: application/json');
	echo json_encode($output);
} else {
	exit;
}

exit;
