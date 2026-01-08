<?php
/**
 * Plugin Name: Search Resources Commands
 * Plugin URI: https://github.com/yourusername/search-resources-commands
 * Description: Keyboard shortcuts for searching WordPress resources via command palette
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: search-resources-commands
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue the plugin's scripts
 */
function search_resources_commands_enqueue_scripts() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_enqueue_script(
		'search-resources-commands',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'search_resources_commands_enqueue_scripts' );
