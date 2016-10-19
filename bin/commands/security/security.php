<?php

if ( ! defined( 'WP_CLI' ) ) {
	return;
}

class Security_Command extends WP_CLI_Command {

	public function __invoke()
	{
		$config = $this->get_security_config();
		$output = $this->format_output($config);

		// display
		WP_CLI::log( json_encode( $output ) );
	}

	protected function get_security_config()
	{
		if( ! $GLOBALS || ! isset( $GLOBALS['aio_wp_security'] ) ) {
			return [];
		}
		if( ! isset( $GLOBALS['aio_wp_security']->configs ) || ! isset( $GLOBALS['aio_wp_security']->configs->configs ) ) {
			return [];
		}

		return $GLOBALS['aio_wp_security']->configs->configs;
	}

	protected function format_output($array)
	{
		$output = [];
		foreach( $array as $key => $value ) {
			$key = str_replace('aiowps_', '', $key);
			$output[$key] = $value;
		}
		return $output;
	}
}

WP_CLI::add_command( 'wp-security', 'Security_Command' );
