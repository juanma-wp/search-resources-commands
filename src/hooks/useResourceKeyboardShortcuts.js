/**
 * Custom hook for managing resource keyboard shortcuts.
 *
 * Implements a two-step shortcut system:
 * 1. Cmd+Option+H activates "resource mode" (shows notice, 3-second timeout)
 * 2. Press B/T/P/R/L/V to open command palette with pre-filled resource search
 *
 * @module useResourceKeyboardShortcuts
 */
import { useEffect, useRef } from "@wordpress/element";
import { useShortcut } from "@wordpress/keyboard-shortcuts";
import { useDispatch } from "@wordpress/data";
import { store as commandsStore } from "@wordpress/commands";
import { store as noticesStore } from "@wordpress/notices";
import { store as keyboardShortcutsStore } from "@wordpress/keyboard-shortcuts";
import { __ } from "@wordpress/i18n";
import { ALL_RESOURCES } from "../constants/resources";
import { prefillCommandPalette } from "../utils/commandPaletteHelper";

/**
 * Timeout duration (in milliseconds) for handbook mode auto-deactivation.
 * @constant {number}
 */
const HANDBOOK_MODE_TIMEOUT = 3000;

/**
 * Hook that manages two-step keyboard shortcuts for resource search.
 *
 * @returns {void}
 */
export const useResourceKeyboardShortcuts = () => {
	const { open } = useDispatch(commandsStore);
	const { createInfoNotice } = useDispatch(noticesStore);
	const { registerShortcut } = useDispatch(keyboardShortcutsStore);

	const handbookModeActive = useRef(false);
	const handbookModeTimeout = useRef(null);

	/**
	 * Register the primary shortcut: Cmd+Option+H
	 * This activates handbook mode and waits for secondary key press.
	 */
	useEffect(() => {
		registerShortcut({
			name: 'search-resources-commands/resource-mode',
			category: 'global',
			description: __('Activate resource search mode', 'search-resources-commands'),
			keyCombination: {
				modifier: 'primaryAlt',
				character: 'h',
			},
		});
	}, []);

	/**
	 * Handle Cmd+Option+H activation.
	 * Shows visual feedback and activates handbook mode with auto-timeout.
	 */
	useShortcut(
		'search-resources-commands/resource-mode',
		(event) => {
			event.preventDefault();
			handbookModeActive.current = true;

			// Provide visual feedback to user
			createInfoNotice(
				__('Resource mode active. Press B (Block Editor), T (Theme), P (Plugin), R (REST API), L (Learn), or V (WordPress TV)', 'search-resources-commands'),
				{
					type: 'snackbar',
					isDismissible: true,
				}
			);

			// Clear any existing timeout
			if (handbookModeTimeout.current) {
				clearTimeout(handbookModeTimeout.current);
			}

			// Auto-deactivate after timeout period
			handbookModeTimeout.current = setTimeout(() => {
				handbookModeActive.current = false;
			}, HANDBOOK_MODE_TIMEOUT);
		},
		{ bindGlobal: true }
	);

	/**
	 * Listen for secondary key press (B/T/P/R) when handbook mode is active.
	 * Opens command palette with pre-filled handbook prefix.
	 */
	useEffect(() => {
		const handleKeyDown = (event) => {
			// Only process if handbook mode is active
			if (!handbookModeActive.current) {
				return;
			}

			// Find matching handbook by key press
			const handbook = ALL_RESOURCES.find(h => h.key === event.key.toLowerCase());

			if (!handbook) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();

			// Deactivate handbook mode
			handbookModeActive.current = false;
			if (handbookModeTimeout.current) {
				clearTimeout(handbookModeTimeout.current);
			}

			// Open command palette
			open();

			// Pre-fill with handbook prefix
			prefillCommandPalette(handbook.prefix);

			// Show usage hint
			const resourceType = handbook.type === 'handbook' ? 'Handbook' : '';
			const message = resourceType
				? `Type your search and press Enter to search ${handbook.name} ${resourceType}`
				: `Type your search and press Enter to search ${handbook.name}`;

			createInfoNotice(
				__(message, 'search-resources-commands'),
				{
					type: 'snackbar',
					isDismissible: true,
				}
			);
		};

		// Use capture phase to intercept before other handlers
		document.addEventListener('keydown', handleKeyDown, true);

		return () => {
			document.removeEventListener('keydown', handleKeyDown, true);
			if (handbookModeTimeout.current) {
				clearTimeout(handbookModeTimeout.current);
			}
		};
	}, []);
};
