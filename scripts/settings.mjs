import { MENU_CONFIG_ITEMS } from "./config.mjs";

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

  Object.values(MENU_CONFIG_ITEMS)
    .toSorted((a, b) =>
      game.i18n
        .localize(a.setting.name)
        .localeCompare(game.i18n.localize(b.setting.name)),
    )
    .forEach((value) => {
      console.log("registering setting", value);
      game.settings.register("dnd-easy-reference", value.setting.key, {
        name: value.setting.name,
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
      });
    });
}
