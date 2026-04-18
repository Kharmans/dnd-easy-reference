// @ts-check

/** @import { SubMenuItem } from '../_types.mjs' */

import { insertCallout, insertBlock } from "./style-html-builders.mjs";

/**
 *
 * @returns {SubMenuItem[]}
 */
export function getStyleMenuSubItems() {
  return [
    {
      title: "DND.MENU.STYLE.ADVICE",
      key: "advice",
      onMenuItemClick: async (menu) => {
        insertCallout({
          menu,
          cssClass: "fvtt advice",
          icon: "icons/vtt-512.png",
          title: "DND.MENU.STYLE.ADVICE_TITLE",
          content: "DND.MENU.STYLE.ADVICE_CONTENT",
        });
      },
    },
    {
      title: "DND.MENU.STYLE.QUEST",
      key: "quest",
      onMenuItemClick: async (menu) => {
        insertCallout({
          menu,
          cssClass: "fvtt quest",
          icon: "icons/magic/symbols/question-stone-yellow.webp",
          title: "DND.MENU.STYLE.QUEST_TITLE",
          content: "DND.MENU.STYLE.QUEST_CONTENT",
        });
      },
    },
    {
      title: "DND.MENU.STYLE.TREASURE",
      key: "treasure",
      onMenuItemClick: async (menu) => {
        insertCallout({
          menu,
          cssClass: "fvtt quest",
          icon: "icons/containers/chest/chest-wooden-tied-white.webp",
          title: "DND.MENU.STYLE.TREASURE_TITLE",
          content: "DND.MENU.STYLE.TREASURE_CONTENT",
        });
      },
    },
    {
      title: "DND.MENU.STYLE.NARRATIVE",
      key: "narrative",
      onMenuItemClick: async (menu) => {
        insertBlock({ menu, cssClass: "fvtt narrative", type: "div" });
      },
    },
    {
      title: "DND.MENU.STYLE.NOTABLE",
      key: "notable",
      onMenuItemClick: async (menu) => {
        insertBlock({ menu, cssClass: "notable", type: "aside" });
      },
    },
  ];
}
