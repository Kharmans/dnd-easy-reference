// @ts-check

/**
 * @typedef {string | string[] | null} MenuDataSource todo document
 */

/**
 * @typedef MenuConfigItemConfigSetting
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
 * @typedef MenuConfigItem
 * @property {string} title
 * @property {MenuItemClickCallback} [onMenuItemClick]
 * @property {SubMenuItem[] | (() => SubMenuItem[])} [items]
 * @property {MenuConfigItemConfigSetting} setting
 */

/**
 * @typedef {(menu: any) => Promise<void>} MenuItemClickCallback
 */

/**
 * @typedef SubMenuItem
 * @property {string} title
 * @property {string} key
 * @property {MenuItemClickCallback?} onMenuItemClick
 */