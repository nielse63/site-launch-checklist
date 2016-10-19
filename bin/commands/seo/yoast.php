<?php

if ( ! defined( 'WP_CLI' ) ) {
	return;
}

class SEO_Command extends WP_CLI_Command {

	public function __invoke()
	{
		$pages = $this->get_pages();

		// display
		WP_CLI::log( json_encode( $pages ) );
	}

	protected function get_pages()
	{
		$pages = get_posts([
			'posts_per_page' => -1,
			'post_type' => 'page'
		]);
		$output = [];
		$tabs = WPSEO_Meta::$meta_fields;

		foreach( $pages as $page ) {
			$rank = get_post_meta($page->ID, '_yoast_wpseo_content_score', true);
			if( ! $rank ) {
				$rank = 0;
			}

			// get meta values
			$meta_values = [];
			foreach( $tabs as $fields ) {
				foreach( array_keys( $fields ) as $key ) {
					$meta_value = WPSEO_Meta::get_value( $key, $page->ID );
					$meta_values[$key] = $meta_value;
				}
			}

			$output[] = [
				'title' => $page->post_title,
				'url'   => get_permalink( $page->ID ),
				'score' => $rank,
				'meta'  => $meta_values,
			];
		}

		return $output;
	}
}

WP_CLI::add_command( 'wp-seo', 'SEO_Command' );
