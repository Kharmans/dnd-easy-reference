// @ts-check

/** @import { SubMenuItem } from '../_types.mjs' */

import { getCalloutHtml, getPullQuoteHtml } from "./system-html.mjs";
import { insertText, replaceSelection } from "../prose-mirror/utils.mjs";

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
        const html = getCalloutHtml({
          cssClass: "fvtt advice",
          icon: "icons/vtt-512.png",
          title: "DND.MENU.STYLE.ADVICE_TITLE",
          text: "DND.MENU.STYLE.ADVICE_CONTENT",
        });

        replaceSelection({
          menu,
          html,
        });
      },
    },
    {
      title: "DND.MENU.STYLE.QUEST",
      key: "quest",
      onMenuItemClick: async (menu) => {
        const html = getCalloutHtml({
          cssClass: "fvtt quest",
          icon: "icons/magic/symbols/question-stone-yellow.webp",
          title: "DND.MENU.STYLE.QUEST_TITLE",
          text: "DND.MENU.STYLE.QUEST_CONTENT",
        });

        replaceSelection({
          menu,
          html,
        });
      },
    },
    {
      title: "DND.MENU.STYLE.TREASURE",
      key: "treasure",
      onMenuItemClick: async (menu) => {
        const html = getCalloutHtml({
          cssClass: "fvtt quest",
          icon: "icons/containers/chest/chest-wooden-tied-white.webp",
          title: "DND.MENU.STYLE.TREASURE_TITLE",
          text: "DND.MENU.STYLE.TREASURE_CONTENT",
        });

        replaceSelection({
          menu,
          html,
        });
      },
    },
    {
      title: "DND.MENU.STYLE.NARRATIVE",
      key: "narrative",
      onMenuItemClick: async (menu) => {
        const html = `<div class="fvtt narrative"><selection></selection></div>`;

        replaceSelection({
          menu,
          html,
        });
      },
    },
    {
      title: "DND.MENU.STYLE.NOTABLE",
      key: "notable",
      onMenuItemClick: async (menu) => {
        const html = `<aside class="notable"><selection></selection></aside>`;

        replaceSelection({
          menu,
          html,
        });
      },
    },
    {
      title: "DND.MENU.STYLE.HABITAT_TREASURE",
      key: "habitat-treasure",
      onMenuItemClick: async (menu) => {
        const habitatTitle = game.i18n.localize(
          "DND.MENU.STYLE.HABITAT_TREASURE_TITLE_HABITAT",
        );
        const habitatContent = game.i18n.localize(
          "DND.MENU.STYLE.HABITAT_TREASURE_CONTENT_HABITAT",
        );
        const treasureTitle = game.i18n.localize(
          "DND.MENU.STYLE.HABITAT_TREASURE_TITLE_TREASURE",
        );
        const treasureContent = game.i18n.localize(
          "DND.MENU.STYLE.HABITAT_TREASURE_CONTENT_TREASURE",
        );
        const html = `
<p class="habitat-treasure">
    <strong>${habitatTitle}</strong>: ${habitatContent}; 
    <strong>${treasureTitle}</strong>: ${treasureContent}
</p>`;
        replaceSelection({ html, menu });
      },
    },
    {
      title: "DND.MENU.STYLE.PULL_QUOTE_LEFT",
      key: "pull-quote-left",
      onMenuItemClick: async (menu) => {
        const html = getPullQuoteHtml({ cssClass: "float-left" });
        replaceSelection({ html, menu });
      },
    },
    {
      title: "DND.MENU.STYLE.PULL_QUOTE_RIGHT",
      key: "pull-quote-right",
      onMenuItemClick: async (menu) => {
        const html = getPullQuoteHtml({ cssClass: "float-right" });
        replaceSelection({ html, menu });
      },
    },
  ];
}
