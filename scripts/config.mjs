// @ts-check

/** @import { MenuConfig } from "./_types.mjs" */

import AttackFormulaDialog from "./applications/attack-formula.mjs";
import AwardFormulaDialog from "./applications/award-formula.mjs";
import CheckFormulaDialog from "./applications/check-formula.mjs";
import ConditionFormulaDialog from "./applications/condition-formula.mjs";
import DamageFormulaDialog from "./applications/damage-formula.mjs";
import HealFormulaDialog from "./applications/heal-formula.mjs";
import LookupFormulaDialog from "./applications/lookup-formula.mjs";
import RuleFormulaDialog from "./applications/rule-formula.mjs";
import SaveFormulaDialog from "./applications/save-formula.mjs";
import { insertText } from "./utils.mjs";

/** The config data we use to establish settings, determine templates, add menus, ... (todo: finish later) */
/** @type {Record<string, MenuConfig>} */
export const MENU_CONFIGS = {
  saves: {
    source: "abilities",
    reference: false,
    onMenuItemClick: async ({ key, menu }) => {
      const options = key ? { defaultAbility: key } : {};
      const text = await SaveFormulaDialog.create(options);
      insertText(text, menu);
    },
    setting: {
      key: "showsaves",
      name: "DND.MENU.SAVES.SETTING.NAME",
    },
  },
  checks: {
    source: ["abilities", "skills"],
    reference: false,
    onMenuItemClick: async ({ key, menu }) => {
      const options = key ? { defaultType: key } : {};
      const text = await CheckFormulaDialog.create(options);
      insertText(text, menu);
    },
    setting: {
      key: "showchecks",
      name: "DND.MENU.CHECKS.SETTING.NAME",
    },
  },
  damage: {
    source: "damageTypes",
    reference: false,
    onMenuItemClick: async ({ key, menu }) => {
      const options = key ? { defaultType: key } : {};
      const text = await DamageFormulaDialog.create(options);
      insertText(text, menu);
    },
    setting: {
      key: "showdamage",
      name: "DND.MENU.DAMAGE.SETTING.NAME",
    },
  },
  attack: {
    source: null,
    reference: false,
    onMenuItemClick: async ({ menu }) => {
      const text = await AttackFormulaDialog.create();
      insertText(text, menu);
    },
    setting: {
      key: "showattack",
      name: "DND.MENU.ATTACK.SETTING.NAME",
    },
  },
  heal: {
    source: "healingTypes",
    reference: false,
    onMenuItemClick: async ({ key, menu }) => {
      const options = key ? { defaultType: key } : {};
      const text = await HealFormulaDialog.create(options);
      if (text) insertText(text, menu);
    },
    setting: {
      key: "showheal",
      name: "DND.MENU.HEAL.SETTING.NAME",
    },
  },
  conditionTypes: {
    source: "conditionTypes",
    reference: true,
    onMenuItemClick: async ({ key, menu }) => {
      const options = key ? { initialData: { condition: key } } : {};
      const text = await ConditionFormulaDialog.create(options);
      insertText(text, menu);
    },
    setting: {
      key: "showconditionTypes",
      name: "DND.MENU.CONDITIONTYPES.SETTING.NAME",
    },
  },
  award: {
    source: null,
    reference: false,
    onMenuItemClick: async ({ menu }) => {
      const text = await AwardFormulaDialog.create();
      insertText(text, menu);
    },
    setting: {
      key: "showaward",
      name: "DND.MENU.AWARD.SETTING.NAME",
    },
  },
  lookup: {
    source: null,
    reference: false,
    onMenuItemClick: async ({ menu }) => {
      const text = await LookupFormulaDialog.create();
      insertText(text, menu);
    },
    setting: {
      key: "showlookup",
      name: "DND.MENU.LOOKUP.SETTING.NAME",
    },
  },
  rules: {
    source: "rules",
    reference: true,
    onMenuItemClick: async ({ menu }) => {
      const text = await RuleFormulaDialog.create();
      insertText(text, menu);
    },
    setting: {
      key: "showrules",
      name: "DND.MENU.RULES.SETTING.NAME",
    },
  },
  weaponMasteries: {
    source: "weaponMasteries",
    reference: true,
    onMenuItemClick: async ({ key, menu }) => {
      const reference = `weaponMastery=${key}`;
      insertText(`&Reference[${reference}]`, menu);
    },
    setting: {
      key: "showweaponMasteries",
      name: "DND.MENU.WEAPONMASTERIES.SETTING.NAME",
    },
  },
  areaTargetTypes: {
    source: "areaTargetTypes",
    reference: true,
    onMenuItemClick: async ({ key, menu }) => {
      insertText(`&Reference[${key}]`, menu);
    },
    setting: {
      key: "showareaTargetTypes",
      name: "DND.MENU.AREATARGETTYPES.SETTING.NAME",
    },
  },
  itemProperties: {
    source: "itemProperties",
    reference: true,
    onMenuItemClick: async ({ key, menu }) => {
      insertText(`&Reference[${key}]`, menu);
    },
    setting: {
      key: "showitemProperties",
      name: "DND.MENU.ITEMPROPERTIES.SETTING.NAME",
    },
  },
  abilities: {
    source: "abilities",
    reference: true,
    onMenuItemClick: async ({ key, menu }) => {
      insertText(`&Reference[${key}]`, menu);
    },
    setting: {
      key: "showabilities",
      name: "DND.MENU.ABILITIES.SETTING.NAME",
    },
  },
  skills: {
    source: "skills",
    reference: true,
    onMenuItemClick: async ({ key, menu }) => {
      insertText(`&Reference[${key}]`, menu);
    },
    setting: {
      key: "showskills",
      name: "DND.MENU.SKILLS.SETTING.NAME",
    },
  },
  damageTypes: {
    source: "damageTypes",
    reference: true,
    onMenuItemClick: async ({ key, menu }) => {
      insertText(`&Reference[${key}]`, menu);
    },
    setting: {
      key: "showdamageTypes",
      name: "DND.MENU.DAMAGETYPES.SETTING.NAME",
    },
  },
  creatureTypes: {
    source: "creatureTypes",
    reference: true,
    onMenuItemClick: async ({ key, menu }) => {
      insertText(`&Reference[${key}]`, menu);
    },
    setting: {
      key: "showcreatureTypes",
      name: "DND.MENU.CREATURETYPES.SETTING.NAME",
    },
  },
  // TODO: Bring this properly into the fold
  detectPatterns: {
    source: null,
    reference: false,
    onMenuItemClick: null,
    setting: {
      key: "showdetectPatterns",
      name: "DND.MENU.DETECTPATTERNS.SETTING.NAME",
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
