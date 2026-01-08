/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import SearchResourcesCommands from './searchResourcesCommands';

// Register the plugin with search resources commands
registerPlugin("search-resources-commands", {
  render: SearchResourcesCommands
});
