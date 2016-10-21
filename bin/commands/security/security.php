<?php

if ( ! defined( 'WP_CLI' ) ) {
	return;
}

function get_security_score_command()
{
	if( ! class_exists('AIOWPSecurity_Feature_Item_Manager') ) {
		WP_CLI::error('AIOWPS Feature Manager not found');
	}

	$feature_mgr = new AIOWPSecurity_Feature_Item_Manager();
	$feature_mgr->initialize_features();
	$feature_mgr->check_and_set_feature_status();

	$output = [];
	$feature_items = $feature_mgr->feature_items;
	foreach ($feature_items as $item) {
		if ($item->feature_status == $feature_mgr->feature_active) {
			$output['active'][] = $item->feature_name;
		} else {
			$output['inactive'][] = $item->feature_name;
		}
	}
	WP_CLI::log( json_encode( $output ) );
}
WP_CLI::add_command( 'wp-security', 'get_security_score_command' );
