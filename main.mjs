import DamageFormulaDialog from "./scripts/applications/damage-formula.js";
import AttackFormulaDialog from "./scripts/applications/attack-formula.js";
import CheckFormulaDialog from "./scripts/applications/check-formula.js";
import SaveFormulaDialog from "./scripts/applications/save-formula.js";
import HealFormulaDialog from "./scripts/applications/heal-formula.js";
import LookupFormulaDialog from "./scripts/applications/lookup-formula.js";
import RuleFormulaDialog from "./scripts/applications/rule-formula.js";
import ConditionFormulaDialog from "./scripts/applications/condition-formula.js";
import { startPatternScan } from "./scripts/detection/pattern-scanner.js";
import AwardFormulaDialog from "./scripts/applications/award-formula.js";
import { MENU_CONFIGS, STYLE_BLOCKS } from "./scripts/config.mjs";
import { initSettings } from "./scripts/settings.mjs";

Hooks.once("init", () => {
  initSettings();
});

Hooks.once("ready", () => {
  if (game.settings.get("dnd-easy-reference", "widenItemWindows")) {
    document.documentElement.classList.add("dnd-widen-windows");
  }
});

Hooks.on("getProseMirrorMenuDropDowns", (proseMirrorMenu, dropdowns) => {
  const insertText = (text) => {
    if (!text) return;
    proseMirrorMenu.view.dispatch(
      proseMirrorMenu.view.state.tr.insertText(text).scrollIntoView(),
    );
  };

  const insertions = {
    reference: (item, category) => {
      const reference =
        category === "weaponMasteries" ? `weaponMastery=${item}` : item;
      insertText(`&Reference[${reference}]`);
    },

    condition: async (conditionId) => {
      const options = conditionId
        ? { initialData: { condition: conditionId } }
        : {};
      const text = await ConditionFormulaDialog.create(options);
      if (text) insertText(text);
    },

    save: async (abilityId) => {
      const options = abilityId ? { defaultAbility: abilityId } : {};
      const text = await SaveFormulaDialog.create(options);
      if (text) insertText(text);
    },

    check: async (skillOrAbility) => {
      const options = skillOrAbility ? { defaultType: skillOrAbility } : {};
      const text = await CheckFormulaDialog.create(options);
      if (text) insertText(text);
    },

    damage: async (damageType) => {
      const options = damageType ? { defaultType: damageType } : {};
      const text = await DamageFormulaDialog.create(options);
      if (text) insertText(text);
    },

    attack: async () => {
      const text = await AttackFormulaDialog.create();
      if (text) insertText(text);
    },

    heal: async (healType) => {
      const options = healType ? { defaultType: healType } : {};
      const text = await HealFormulaDialog.create(options);
      if (text) insertText(text);
    },

    rule: async () => {
      const text = await RuleFormulaDialog.create();
      if (text) insertText(text);
    },

    award: async () => {
      const text = await AwardFormulaDialog.create();
      if (text) insertText(text);
    },

    lookup: async () => {
      const text = await LookupFormulaDialog.create();
      if (text) insertText(text);
    },
  };

  const createMenuEntries = (category, config) => {
    if (category === "saves") {
      return Object.keys(CONFIG.DND5E[config.source] || {}).map((item) => ({
        title: CONFIG.DND5E[config.source][item]?.label || item,
        action: item,
        cmd: () => insertions.save(item),
      }));
    }

    if (category === "checks") {
      return [
        ...Object.keys(CONFIG.DND5E[config.source.abilities] || {}).map(
          (ability) => ({
            title:
              CONFIG.DND5E[config.source.abilities][ability]?.label || ability,
            action: ability,
            cmd: () => insertions.check(ability),
          }),
        ),
        ...Object.keys(CONFIG.DND5E[config.source.skills] || {}).map(
          (skill) => ({
            title: CONFIG.DND5E[config.source.skills][skill]?.label || skill,
            action: skill,
            cmd: () => insertions.check(skill),
          }),
        ),
      ];
    }

    if (category === "damage") {
      return Object.keys(CONFIG.DND5E[config.source] || {}).map((item) => ({
        title: CONFIG.DND5E[config.source][item]?.label || item,
        action: item,
        cmd: () => insertions.damage(item),
      }));
    }

    if (category === "heal") {
      return Object.keys(CONFIG.DND5E[config.source] || {}).map((item) => ({
        title: CONFIG.DND5E[config.source][item]?.label || item,
        action: item,
        cmd: () => insertions.heal(item),
      }));
    }

    return Object.keys(CONFIG.DND5E[config.source] || {})
      .filter(
        (item) =>
          !config.reference || CONFIG.DND5E[config.source][item]?.reference,
      )
      .map((item) => ({
        title: CONFIG.DND5E[config.source][item]?.label || item,
        action: item,
        cmd: () => insertions.reference(item, category),
      }));
  };

  const createStyleEntry = (type, config) => {
    if (config.type) {
      return {
        title: game.i18n.localize(`DND.MENU.STYLE.${type.toUpperCase()}`),
        action: type,
        node: proseMirrorMenu.schema.nodes[config.type],
        attrs: { class: config.class },
        cmd: () =>
          proseMirrorMenu._toggleBlock(
            proseMirrorMenu.schema.nodes[config.type],
            foundry.prosemirror.commands.wrapIn,
            { attrs: { _preserve: { class: config.class } } },
          ),
      };
    }

    return {
      title: game.i18n.localize(`DND.MENU.STYLE.${type.toUpperCase()}`),
      action: type,
      cmd: () => {
        const schema = proseMirrorMenu.schema;
        const divNode = schema.nodes.div.create(
          { _preserve: { class: config.class } },
          [
            schema.nodes.figure.create({ _preserve: { class: "icon" } }, [
              schema.nodes.image.create({
                src: config.icon,
                _preserve: { class: "round" },
              }),
            ]),
            schema.nodes.article.create(null, [
              schema.nodes.heading.create(
                { level: 4 },
                schema.text(
                  game.i18n.localize(
                    `DND.MENU.STYLE.${type.toUpperCase()}_TITLE`,
                  ),
                ),
              ),
              schema.nodes.paragraph.create(
                null,
                schema.text(
                  game.i18n.localize(
                    `DND.MENU.STYLE.${type.toUpperCase()}_CONTENT`,
                  ),
                ),
              ),
            ]),
          ],
        );
        proseMirrorMenu.view.dispatch(
          proseMirrorMenu.view.state.tr.replaceSelectionWith(divNode),
        );
        return true;
      },
    };
  };

  const enabledMenus = Object.entries(MENU_CONFIGS).filter(([_, value]) =>
    game.settings.get("dnd-easy-reference", value.setting.key),
  );

  //region Menu final
  dropdowns.dndeasyreference = {
    action: "reference",
    title: '<i class="fa-solid fa-books"></i>', // Icône FontAwesome
    entries: [
      ...(game.settings.get("dnd-easy-reference", "showdetectPatterns")
        ? [
            {
              title:
                game.i18n.localize("DND.DETECT.TITLE") || "Detect Patterns",
              action: "detect-patterns",
              children: [
                {
                  title: game.i18n.localize("DND.MENU.HEAL.TITLE"),
                  action: "detect-heal",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "heal", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.SAVES.TITLE"),
                  action: "detect-save",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "save", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.CHECKS.TITLE"),
                  action: "detect-check",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "check", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.DAMAGE.TITLE"),
                  action: "detect-damage",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "damage", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.ATTACK.TITLE"),
                  action: "detect-attack",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "attack", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.CONDITIONTYPES.TITLE"),
                  action: "detect-condition",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "condition", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.RULES.TITLE"),
                  action: "detect-rule",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "rule", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.WEAPONMASTERIES.TITLE"),
                  action: "detect-weaponMastery",
                  cmd: () =>
                    startPatternScan(
                      proseMirrorMenu,
                      "weaponMastery",
                      insertText,
                    ),
                },
                {
                  title: game.i18n.localize("DND.MENU.AREATARGETTYPES.TITLE"),
                  action: "detect-areaTargetType",
                  cmd: () =>
                    startPatternScan(
                      proseMirrorMenu,
                      "areaTargetType",
                      insertText,
                    ),
                },
                {
                  title: game.i18n.localize("DND.MENU.ITEMPROPERTIES.TITLE"),
                  action: "detect-spellProperty",
                  cmd: () =>
                    startPatternScan(
                      proseMirrorMenu,
                      "spellProperty",
                      insertText,
                    ),
                },
                {
                  title: game.i18n.localize("DND.MENU.ABILITIES.TITLE"),
                  action: "detect-ability",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "ability", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.SKILLS.TITLE"),
                  action: "detect-skill",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "skill", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.DAMAGETYPES.TITLE"),
                  action: "detect-damageType",
                  cmd: () =>
                    startPatternScan(proseMirrorMenu, "damageType", insertText),
                },
                {
                  title: game.i18n.localize("DND.MENU.CREATURETYPES.TITLE"),
                  action: "detect-creatureType",
                  cmd: () =>
                    startPatternScan(
                      proseMirrorMenu,
                      "creatureType",
                      insertText,
                    ),
                },
              ],
            },
          ]
        : []),
      ...enabledMenus
        .filter(([_, config]) => config.dialogHandler)
        .map(([key, config]) => ({
          title: game.i18n.localize(`DND.MENU.${key.toUpperCase()}.TITLE`),
          action: `${key}-dialog`,
          cmd: () => insertions[config.dialogHandler](),
        })),

      ...enabledMenus
        .filter(([_, config]) => !config.dialogHandler && config.source)
        .map(([key, config]) => ({
          title: game.i18n.localize(`DND.MENU.${key.toUpperCase()}.TITLE`),
          action: key,
          children: createMenuEntries(key, config),
        })),

      {
        title: game.i18n.localize("DND.MENU.STYLE.TITLE"),
        action: "styles",
        children: Object.entries(STYLE_BLOCKS).map(([type, config]) =>
          createStyleEntry(type, config),
        ),
      },
    ],
  };
});
