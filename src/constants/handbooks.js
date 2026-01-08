/**
 * WordPress resource configuration data.
 *
 * Each resource entry defines:
 * - type: Resource type ('handbook' or 'site')
 * - prefix: The shortcut prefix used in search (e.g., "!b" for Block Editor)
 * - name: Display name of the resource
 * - url: Base URL for the resource
 * - icon: WordPress icon component to represent the resource
 * - key: Single character key used in two-step shortcuts (e.g., "b" after Cmd+Option+H)
 */
import { help, pages, plugins, code, lifesaver, video } from "@wordpress/icons";

export const RESOURCES = [
	{
		type: "handbook",
		prefix: "!b",
		name: "Block Editor",
		url: "https://developer.wordpress.org/block-editor/",
		icon: help,
		key: "b",
	},
	{
		type: "handbook",
		prefix: "!t",
		name: "Theme",
		url: "https://developer.wordpress.org/themes/",
		icon: pages,
		key: "t",
	},
	{
		type: "handbook",
		prefix: "!p",
		name: "Plugin",
		url: "https://developer.wordpress.org/plugins/",
		icon: plugins,
		key: "p",
	},
	{
		type: "handbook",
		prefix: "!r",
		name: "REST API",
		url: "https://developer.wordpress.org/rest-api/",
		icon: code,
		key: "r",
	},
	{
		type: "site",
		prefix: "!l",
		name: "Learn WordPress",
		url: "https://learn.wordpress.org/",
		icon: lifesaver,
		key: "l",
	},
	{
		type: "site",
		prefix: "!v",
		name: "WordPress TV",
		url: "https://wordpress.tv/",
		icon: video,
		key: "v",
	},
];

/**
 * Legacy exports for backward compatibility.
 * @deprecated Use RESOURCES instead
 */
export const HANDBOOKS = RESOURCES.filter(r => r.type === "handbook");
export const LEARNING_RESOURCES = RESOURCES.filter(r => r.type === "site");
export const ALL_RESOURCES = RESOURCES;
