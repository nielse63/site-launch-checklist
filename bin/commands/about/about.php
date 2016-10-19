<?php
/**
 * Author  : Mark Wallace
 * Company : Sinebridge (sinebridge.com)
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
	 * [--nocolor]
	 * : Set flag to not output colorized
	 *
     * [--site=<option>] [--db=<parameter>]
     * : Note: parameters are optional. If none are provided the command
	 *       will print out both site and db information
	 *
	 * ---> Site options
	 *    = all                # Return all site parameter
	 *    = blogname           # Site title    -  /Settings/General
	 *    = blogdescription    # Tagline       -  /Settings/General
	 *    = etc... any other valid wordpress site parameter
	 *
	 * ---> Database parameters
	 *    = all                # Return all database parameters
	 *    = host
	 *    = name
	 *    = user
	 *    = password           # Not returned in the default information listing
     *
     * ## EXAMPLES
     *
	 *     wp about
	 *     wp about --site=blogname
     *     wp about --db=username
     *
     * @synopsis [--site=<option>] [--db=<parameter>] [--nocolor]
     */
    public function __invoke($args = array(), $assoc_args = array())
    {

    	if (array_key_exists('nocolor', $assoc_args)) {
    		$this->inColor = false;
    	}

    	// Check for parameters
    	switch (true) {
			case array_key_exists('site', $assoc_args):
				$this->site($assoc_args['site']);
				break;

			case array_key_exists('db', $assoc_args):
				$this->db($assoc_args['db']);
				break;

			default:
				// Return both site and db information
				$this->site();
				$this->db();
				$this->misc();
				WP_CLI::log(PHP_EOL);
    	}
    }


	/**
	 * Return information about the site
	 */
	protected function site($option = null)
	{
		if (is_null($option) || strtolower($option) === 'all') {
			WP_CLI::log('');
			WP_CLI::log(str_repeat('-', 50));
			$this->log('Site Information', null,   '%Y');

			foreach($this->siteKeys as $option => $desc) {
				$this->log($desc  , get_option( $option ));
			}

		} else {
			/**
			 * Output the value of the requested parameter
			 */
			WP_CLI::log(get_option( $option ));

		}

	}


	/**
	 * Returns information about the site database
	 */
	protected function db($param = null)
	{
		if (is_null($param) || strtolower($param) === 'all') {
			WP_CLI::log('');
			WP_CLI::log(str_repeat('-', 50));
			$this->log('Database Information', null, '%Y');

			$this->log('Hostname'     , DB_HOST);
			$this->log('Database Name', DB_NAME);
			$this->log('Username'     , DB_USER);
			$this->log('Password'     , str_repeat('*', strlen(DB_PASSWORD)));

		} else {
			/**
			 * Only output the value of the requested parameter
			 */
			if (array_key_exists($param, $this->dbKeys)) {
				WP_CLI::log(constant($this->dbKeys[$param]));
			} else {
				WP_CLI::error('Invalid parameter:' . $param);
			}

		}

	}


	/**
	 * Return miscellanous information about the environment
	 */
	protected function misc()
	{
		$versions_path = ABSPATH . 'wp-includes/version.php';

		if ( !is_readable( $versions_path ) ) {
			WP_CLI::error(
				"This does not seem to be a WordPress install.\n" .
				"Pass --path=`path/to/wordpress` or run `wp core download`." );
		}

		include $versions_path;

		WP_CLI::log('');
		WP_CLI::log(str_repeat('-', 50));
		$this->log('Miscellaneous Environment Information', null,   '%Y');

		$this->log('Wordpress version'  , $wp_version);
		$this->log('Database revision'  , $wp_db_version);

		if ( is_multisite() ) {
			$this->log('Multisite install'  , 'true');
		} else {
			$this->log('Multisite install'  , 'false');
		}

		WP_CLI::log('');
		$this->log( "PHP version"       , PHP_VERSION );
		WP_CLI::log('');

		$this->log( "OS Hostname"       , php_uname('n') );
		$this->log( "OS Type"           , php_uname('s') );
		$this->log( "OS Version"        , php_uname('v') );
		$this->log( "OS Release"        , php_uname('r') );
		$this->log( "Machine type"      , php_uname('m') );

	}


	/**
	 * Output a colorized & formatted string
	 */
	protected function log($label, $value = null, $color = '%C')
	{
		if ($value) {
			$label = \cli\Colors::colorize( "- $color" . str_pad($label, 20) . ":%n ", $this->inColor );
		} else {
			$label = \cli\Colors::colorize( "- $color" . $label . "%n", $this->inColor );
		}

		WP_CLI::log($label . $value);
	}

}

WP_CLI::add_command( 'about', 'About_Command' );

