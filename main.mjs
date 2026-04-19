import { MENU_CONFIG_ITEMS } from "./scripts/config.mjs";
import { initSettings } from "./scripts/settings.mjs";

const Hooks = foundry.helpers.Hooks;

Hooks.once("i18nInit", () => {
  // Allow outside scripts to change the menu.
  Hooks.callAll("dnd-easy-reference.prepareConfigMenuItems", MENU_CONFIG_ITEMS);

  // Put menu config in CONFIG.
  CONFIG.DND_EASY_REFERENCE = { MENU_CONFIG_ITEMS };

  // Init settings at this startup phase because of localized setting sorting.
  initSettings(MENU_CONFIG_ITEMS);
});

Hooks.once("ready", () => {
  // TODO: Handle detached windows for Foundry 14 ;)
  if (game.settings.get("dnd-easy-reference", "widenItemWindows")) {
    document.documentElement.classList.add("dnd-widen-windows");
  }
});

Hooks.on("getProseMirrorMenuDropDowns", (proseMirrorMenu, dropdowns) => {
  const entries = Object.entries(MENU_CONFIG_ITEMS)
    // Only show enabled options or those without settings
    .filter(
      ([_, value]) =>
        !value.setting?.key ||
        game.settings.get("dnd-easy-reference", value.setting.key),
    )
    // Create menu items
    .map(([key, value]) => ({
      title: game.i18n.localize(value.title),
      action: `${key.slugify()}-menu-item`,
      cmd: value.onMenuItemClick
        ? () => value.onMenuItemClick?.(proseMirrorMenu)
        : undefined,
      children: (typeof value.items === "function"
        ? value.items()
        : value.items
      )?.map((item) => ({
        title: item.title,
        action: `${key.slugify()}-${item.key.slugify()}-sub-menu-item`,
        cmd: item.onMenuItemClick
          ? () => item.onMenuItemClick?.(proseMirrorMenu)
          : undefined,
      })),
    }))
    // Sort by title for the current locale
    .sort((a, b) => a.title.localeCompare(b.title));

  // Assign to own menu
  dropdowns.dndeasyreference = {
    action: "reference",
    title: '<i class="fa-solid fa-books"></i>',
    entries,
  };
});
