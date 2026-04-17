/** @import { MenuConfig } from "./scripts/config.mjs" */

import { MENU_CONFIGS, STYLE_BLOCKS } from "./scripts/config.mjs";
import { initSettings } from "./scripts/settings.mjs";
import { getDetectionMenuEntries } from "./scripts/detection/menu-setup.mjs";

Hooks.once("init", () => {
  initSettings();
});

Hooks.once("ready", () => {
  if (game.settings.get("dnd-easy-reference", "widenItemWindows")) {
    document.documentElement.classList.add("dnd-widen-windows");
  }
});

Hooks.on("getProseMirrorMenuDropDowns", (proseMirrorMenu, dropdowns) => {
  /**
   *
   * @param {string} category
   * @param {MenuConfig} config
   * @returns
   */
  const createMenuEntries = (category, config) => {
    const sources =
      typeof config.source === "string" ? [config.source] : config.source;

    const entries = [];

    for (const source of sources) {
      entries.push(
        ...Object.entries(CONFIG.DND5E[source] || {})
          // When dealing with references, skip any config entries without a reference property value.
          .filter(([_key, value]) => !config.reference || value?.reference)
          .map(([key, value]) => ({
            title: value.label || key,
            action: key,
            cmd: () => {
              config.dialogHandler({
                key: key,
                menu: proseMirrorMenu,
                value: value,
              });
            },
          })),
      );
    }

    return entries;
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

  dropdowns.dndeasyreference = {
    action: "reference",
    title: '<i class="fa-solid fa-books"></i>', // Icône FontAwesome
    entries: [
      ...getDetectionMenuEntries,
      ...enabledMenus
        .filter(([_, config]) => !config.source)
        .map(([key, config]) => ({
          title: game.i18n.localize(`DND.MENU.${key.toUpperCase()}.TITLE`),
          action: `${key}-dialog`,
          cmd: () =>
            config.dialogHandler({
              key: undefined,
              value: undefined,
              menu: proseMirrorMenu,
            }),
        })),

      ...enabledMenus
        .filter(([_, config]) => config.source)
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
