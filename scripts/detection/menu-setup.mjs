export function getDetectionMenuEntries() {
  return [
    {
      title: game.i18n.localize("DND.DETECT.TITLE") || "Detect Patterns",
      action: "detect-patterns",
      children: [
        {
          title: game.i18n.localize("DND.MENU.HEAL.TITLE"),
          action: "detect-heal",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "heal", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.SAVES.TITLE"),
          action: "detect-save",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "save", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.CHECKS.TITLE"),
          action: "detect-check",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "check", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.DAMAGE.TITLE"),
          action: "detect-damage",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "damage", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.ATTACK.TITLE"),
          action: "detect-attack",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "attack", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.CONDITIONTYPES.TITLE"),
          action: "detect-condition",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "condition", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.RULES.TITLE"),
          action: "detect-rule",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "rule", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.WEAPONMASTERIES.TITLE"),
          action: "detect-weaponMastery",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "weaponMastery", insertText),
        },
        {
          title: game.i18n.localize("DND.MENU.AREATARGETTYPES.TITLE"),
          action: "detect-areaTargetType",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "areaTargetType", insertText),
        },
        {
          title: game.i18n.localize("DND.MENU.ITEMPROPERTIES.TITLE"),
          action: "detect-spellProperty",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "spellProperty", insertText),
        },
        {
          title: game.i18n.localize("DND.MENU.ABILITIES.TITLE"),
          action: "detect-ability",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "ability", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.SKILLS.TITLE"),
          action: "detect-skill",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "skill", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.DAMAGETYPES.TITLE"),
          action: "detect-damageType",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "damageType", (text) =>
              insertText(text, proseMirrorMenu),
            ),
        },
        {
          title: game.i18n.localize("DND.MENU.CREATURETYPES.TITLE"),
          action: "detect-creatureType",
          cmd: () =>
            startPatternScan(proseMirrorMenu, "creatureType", insertText),
        },
      ],
    },
  ];
}
