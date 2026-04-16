import { MENU_CONFIG_LIST } from "./config.mjs";

export function initSettings() {
  game.settings.register("dnd-easy-reference", "widenItemWindows", {
    name: game.i18n.localize("DND.SETTINGS.PROSEGAP.TITLE"),
    hint: game.i18n.localize("DND.SETTINGS.PROSEGAP.HINT"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    requiresReload: true,
    onChange: (value) => {
      if (value) {
        document.documentElement.classList.add("dnd-widen-windows");
      } else {
        document.documentElement.classList.remove("dnd-widen-windows");
      }
    },
  });

  MENU_CONFIG_LIST.forEach((config) => {
    game.settings.register("dnd-easy-reference", config.setting.key, {
      name: config.setting.name,
      scope: "world",
      config: true,
      type: Boolean,
      default: true,
    });
  });
}
