/**
 * @typedef {string | string[] | null} MenuDataSource todo document
 */

/**
 * @typedef MenuConfigSetting
 * @property {string} key - the setting key, which is used to save and load the setting.
 * @property {string} name - the localization key for the setting name.
 */

/**
 * @typedef OnMenuItemClickCallbackOptions
 * @property {string|undefined}    key     The selected sub-menu option key, based on source data, such as "athletics", "lightning", or "str".
 * @property {Record<string, any>|undefined} value   The CONFIG.DND5E value of the selected key. For a skill, this would contain label, reference, etc.
 * @property {any} menu               The ProseMirrorMenu instance.
 */

/**
 * @typedef {(options: OnMenuItemClickCallbackOptions) => Promise<void>} OnMenuItemClickCallback
 */

/**
 * @typedef MenuConfig
 * @property {MenuDataSource} source      0 to many keys for checking in CONFIG.DND5E.
 * @property {boolean} reference          Denotes that the source data should be filtered down to entries with a non-nullish reference property.
 *                                        For example, if someone adds a weapon mastery and doesn't supply a reference, then skip it while
 *                                        making menu entries for the other references.
 * @property {OnMenuItemClickCallback|null} onMenuItemClick
 * @property {MenuConfigSetting} setting
 * @property {string} title               The text which appears on the menu item. Localization keys are also valid.
 */