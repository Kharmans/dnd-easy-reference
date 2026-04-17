/** @import { MenuConfig } from './_types.mjs' */

import { MENU_CONFIGS, STYLE_BLOCKS } from "./config.mjs";
import { getDetectionMenuEntries } from "./detection/menu-setup.mjs";

export function addEasyReferenceMenu(dropdowns, proseMirrorMenu) {
  const enabledMenus = Object.entries(MENU_CONFIGS).filter(([_, value]) =>
    game.settings.get("dnd-easy-reference", value.setting.key),
  );

  dropdowns.dndeasyreference = {
    action: "reference",
    title: '<i class="fa-solid fa-books"></i>', // Icône FontAwesome
    entries: [
      ...getDetectionMenuEntries(),
      ...enabledMenus
        .filter(([_, config]) => !config.source)
        .map(([key, config]) => ({
          title: game.i18n.localize(`DND.MENU.${key.toUpperCase()}.TITLE`),
          action: `${key}-dialog`,
          cmd: () =>
            config.onMenuItemClick?.({
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
          children: createSubMenuEntriesFromSourceData(config, proseMirrorMenu),
        })),

      {
        title: game.i18n.localize("DND.MENU.STYLE.TITLE"),
        action: "styles",
        children: Object.entries(STYLE_BLOCKS).map(([type, config]) =>
          createStyleEntry(type, config, proseMirrorMenu),
        ),
      },
    ],
  };
}

/**
 * Given a menu config, read CONFIG.DND5E for source data and generate submenu items.
 * @param {MenuConfig} config   The menu config to reference when setting up the submenu.
 * @param {any} menu            The ProseMirrorMenu instance.
 * @returns
 */
function createSubMenuEntriesFromSourceData(config, menu) {
  const sources =
    (typeof config.source === "string" ? [config.source] : config.source) ?? [];

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
            config.onMenuItemClick?.({
              key: key,
              menu: menu,
              value: value,
            });
          },
        })),
    );
  }

  return entries;
}

function createStyleEntry(type, config, menu) {
  if (config.type) {
    return {
      title: game.i18n.localize(`DND.MENU.STYLE.${type.toUpperCase()}`),
      action: type,
      node: menu.schema.nodes[config.type],
      attrs: { class: config.class },
      cmd: () =>
        menu._toggleBlock(
          menu.schema.nodes[config.type],
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
}
