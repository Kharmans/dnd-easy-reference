import { initSettings } from "./scripts/settings.mjs";
import { addEasyReferenceMenu } from "./scripts/menu.mjs";

const Hooks = foundry.helpers.Hooks;

Hooks.once("init", () => {
  initSettings();
});

Hooks.once("ready", () => {
  // TODO: Handle detached windows for Foundry 14 ;)
  if (game.settings.get("dnd-easy-reference", "widenItemWindows")) {
    document.documentElement.classList.add("dnd-widen-windows");
  }
});

Hooks.on("getProseMirrorMenuDropDowns", (proseMirrorMenu, dropdowns) => {
  addEasyReferenceMenu(dropdowns, proseMirrorMenu);
});
