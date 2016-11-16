<?php

foreach($argv as $arg) {
	if( stripos($arg, 'ABSPATH') !== false ) {
		$path = @end(explode('=', $arg));
		$path = rtrim($path, '/');
		define('ABSPATH', $path);
		break;
	}
}

$output = [
	"php_version"  => PHP_VERSION,
	"os_hostname"  => php_uname('n'),
	"os_type"      => php_uname('s'),
	"os_version"   => php_uname('v'),
	"os_release"   => php_uname('r'),
	"machine_type" => php_uname('m'),
];

if( defined('ABSPATH') ) {
	$versions_path = ABSPATH . '/wp-includes/version.php';
	if( file_exists($versions_path) && is_readable($versions_path) ) {
		include $versions_path;
		$output['wp_version'] = $wp_version;
		$output['db_version'] = $wp_db_version;
	}
}

echo json_encode($output);
exit;
