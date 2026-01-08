/**
 * Custom hook for registering individual resource search commands.
 *
 * Creates command palette entries for each resource that:
 * - Appear in the command palette by default
 * - Guide users on how to use the shortcut syntax
 * - Open the command palette with usage instructions
 *
 * @module useResourceCommands
 */
import { useCommands } from "@wordpress/commands";
import { useDispatch } from "@wordpress/data";
import { store as commandsStore } from "@wordpress/commands";
import { store as noticesStore } from "@wordpress/notices";
import { __ } from "@wordpress/i18n";
import { ALL_RESOURCES } from "../constants/resources";

/**
 * Registers static commands for each resource.
 *
 * These commands are always visible in the command palette and serve as
 * entry points for users who don't know about the shortcut syntax.
 *
 * @returns {void}
 */
export const useResourceCommands = () => {
	const { open } = useDispatch(commandsStore);
	const { createInfoNotice } = useDispatch(noticesStore);

	const commands = ALL_RESOURCES.map((resource) => {
		const resourceType = resource.type === 'handbook' ? 'Handbook' : '';
		const label = resourceType
			? `Search ${resource.name} ${resourceType}`
			: `Search ${resource.name}`;

		return {
			name: `search-resources-commands/search-${resource.prefix}`,
			label: __(label, "search-resources-commands"),
			icon: resource.icon,
			callback: () => {
				open();
				createInfoNotice(
					__(`Type your search term and add "${resource.prefix}" to search`, 'search-resources-commands'),
					{
						type: 'snackbar',
						isDismissible: true,
					}
				);
			},
		};
	});

	useCommands(commands);
};
