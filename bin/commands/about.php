<?php
/**
 * Author  : Erik Nielsen
 * Company : Clique Studios
 */

if ( !defined( 'WP_CLI' ) ) return;

/**
 * Return information about the wordpress installation and environment.
 */
class About_Command extends WP_CLI_Command {

	/**
	 * Should the output be colorized?
	 */
	protected $inColor = true;

	/**
	 * Keys that will be returned when no specific site option is requested
	 */
	protected $siteKeys = array(
		'blogname'        => 'Site Title',
		'blogdescription' => 'Tagline',
		'siteurl'         => 'Wp Address (URL)',
		'home'            => 'Site Address (URL)',
		'admin_email'     => 'E-mail Address',
		'template'        => 'Current theme name'
	);

	/**
	 * Keys that can be returned for the database parameters
	 */
	protected $dbKeys = array(
		'host'     => 'DB_HOST',
		'name'     => 'DB_NAME',
		'user'     => 'DB_USER',
		'password' => 'DB_PASSWORD'
	);

	/**
     * Site and Database information
	 *
	 * ## OPTIONS
	 *
	 * [--site]
	 * : Prints site information
	 *
	 * [--db]
	 * : Prints database information
	 *
	 * [--env]
	 * : Prints environment information
     *
     * ## EXAMPLES
     *
	 *     wp about
	 *     wp about --site=blogname
     *     wp about --db=username
     *
     * @synopsis [--site] [--db] [--env] [--nocolor]
     */
	public function __invoke($args = array(), $assoc_args = array())
	{
		$this->output = [];

		$options = ['site', 'db', 'env'];

		if( ! count( $assoc_args ) ) {
			$assoc_args = array_combine($options, [true, true, true]);
		}

		foreach($options as $option) {
			if (array_key_exists($option, $assoc_args)) {
				$this->output[$option] = [];
				$this->{$option}();
			}
		}

		if( count( $this->output ) === 1 ) {
			$this->output = reset( $this->output );
		}
		WP_CLI::log(json_encode($this->output));
	}

	/**
	 * Return information about the site
	 */
	protected function site()
	{
		$output = [];

		foreach($this->siteKeys as $option => $desc) {
			$output[$option] = get_option($option);
		}

		$this->output['site'] = $output;
	}
	/**
	 * Returns information about the site database
	 */
	protected function db()
	{
		$this->output['db'] = [
			'host' => DB_HOST,
			'name' => DB_NAME,
			'username' => DB_USER,
			'password' => str_repeat('*', strlen(DB_PASSWORD)),
		];
	}

	protected function env()
	{
		$versions_path = ABSPATH . 'wp-includes/version.php';
		if ( !is_readable( $versions_path ) ) {
			WP_CLI::error(
				"This does not seem to be a WordPress install.\n" .
				"Pass --path=`path/to/wordpress` or run `wp core download`." );
		}
		include $versions_path;

		$this->output['env'] = [
			'wp_version'   => $wp_version,
			'db_version'   => $wp_db_version,
			"php_version"  => PHP_VERSION,
			"os_hostname"  => php_uname('n'),
			"os_type"      => php_uname('s'),
			"os_version"   => php_uname('v'),
			"os_release"   => php_uname('r'),
			"machine_type" => php_uname('m'),
			"other"        => $_SERVER,
		];
	}
}

WP_CLI::add_command( 'about', 'About_Command' );
