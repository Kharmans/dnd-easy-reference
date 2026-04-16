// @ts-check

/**
 * @typedef {string | Record<string, string> | null} MenuDataSource todo document
 */

/**
 * @typedef MenuConfigSetting
 * @property {string} key - the setting key, which is used to save and load the setting.
 * @property {string} name - the localization key for the setting name.
 */

/**
 * @typedef MenuConfig
 * @property {MenuDataSource} source      0 to many keys for checking in CONFIG.DND5E.
 * @property {boolean} reference          ??? What is this?
 * @property {string|null} dialogHandler   
 * @property {MenuConfigSetting} setting
 */

/** The config data we use to establish settings, determine templates, add menus, ... (todo: finish later) */
/** @type {Record<string, MenuConfig>} */
export const MENU_CONFIGS = {
  saves: {
    source: "abilities",
    reference: false,
    dialogHandler: "save",
    setting: {
      key: "showsaves",
      name: "DND.MENU.SAVES.TITLE",
    },
  },
  checks: {
    source: {
      abilities: "abilities",
      skills: "skills",
    },
    reference: false,
    dialogHandler: "check",
    setting: {
      key: "showchecks",
      name: "DND.MENU.CHECKS.TITLE",
    },
  },
  damage: {
    source: "damageTypes",
    reference: false,
    dialogHandler: "damage",
    setting: {
      key: "showdamage",
      name: "DND.MENU.DAMAGE.TITLE",
    },
  },
  attack: {
    source: null,
    reference: false,
    dialogHandler: "attack",
    setting: {
      key: "showattack",
      name: "DND.MENU.ATTACK.TITLE",
    },
  },
  heal: {
    source: "healingTypes",
    reference: false,
    dialogHandler: "heal",
    setting: {
      key: "showheal",
      name: "DND.MENU.HEAL.TITLE",
    },
  },
  conditionTypes: {
    source: "conditionTypes",
    reference: true,
    dialogHandler: "condition",
    setting: {
      key: "showconditionTypes",
      name: "DND.MENU.CONDITIONTYPES.TITLE",
    },
  },
  award: {
    source: null,
    reference: false,
    dialogHandler: "award",
    setting: {
      key: "showaward",
      name: "DND.MENU.AWARD.TITLE",
    },
  },
  lookup: {
    source: null,
    reference: false,
    dialogHandler: "lookup",
    setting: {
      key: "showlookup",
      name: "DND.MENU.LOOKUP.TITLE",
    },
  },
  rules: {
    source: "rules",
    reference: true,
    dialogHandler: "rule",
    setting: {
      key: "showrules",
      name: "DND.MENU.RULES.TITLE",
    },
  },
  weaponMasteries: {
    source: "weaponMasteries",
    reference: true,
    dialogHandler: null,
    setting: {
      key: "showweaponMasteries",
      name: "DND.MENU.WEAPONMASTERIES.TITLE",
    },
  },
  areaTargetTypes: {
    source: "areaTargetTypes",
    reference: true,
    dialogHandler: null,
    setting: {
      key: "showareaTargetTypes",
      name: "DND.MENU.AREATARGETTYPES.TITLE",
    },
  },
  itemProperties: {
    source: "itemProperties",
    reference: true,
    dialogHandler: null,
    setting: {
      key: "showitemProperties",
      name: "DND.MENU.ITEMPROPERTIES.TITLE",
    },
  },
  abilities: {
    source: "abilities",
    reference: true,
    dialogHandler: null,
    setting: {
      key: "showabilities",
      name: "DND.MENU.ABILITIES.TITLE",
    },
  },
  skills: {
    source: "skills",
    reference: true,
    dialogHandler: null,
    setting: {
      key: "showskills",
      name: "DND.MENU.SKILLS.TITLE",
    },
  },
  damageTypes: {
    source: "damageTypes",
    reference: true,
    dialogHandler: null,
    setting: {
      key: "showdamageTypes",
      name: "DND.MENU.DAMAGETYPES.TITLE",
    },
  },
  creatureTypes: {
    source: "creatureTypes",
    reference: true,
    dialogHandler: null,
    setting: {
      key: "showcreatureTypes",
      name: "DND.MENU.CREATURETYPES.TITLE",
    },
  },
  detectPatterns: {
    source: null,
    reference: false,
    dialogHandler: null,
    setting: {
      key: "showdetectPatterns",
      name: "DND.MENU.DETECTPATTERNS.TITLE",
    },
  },
};

export const MENU_CONFIG_LIST = Object.entries(MENU_CONFIGS).map(
  ([key, value]) => ({
    key: key,
    ...value,
  }),
);

export const STYLE_BLOCKS = {
  advice: { class: "fvtt advice", icon: "icons/vtt-512.png" },
  quest: {
    class: "fvtt quest",
    icon: "icons/magic/symbols/question-stone-yellow.webp",
  },
  treasure: {
    class: "fvtt quest",
    icon: "icons/containers/chest/chest-wooden-tied-white.webp",
  },
  narrative: { class: "fvtt narrative", type: "div" },
  notable: { class: "notable", type: "aside" },
};
