import { getSelectedText } from "../prose-mirror/utils.mjs";

/**
 * Creates the Foundry callout node.
 * @param {Object} params  the fields needed for creating
 * @param {any} params.menu a ProseMirrorMenu instance
 * @param {string} params.title the callout title
 * @param {string} params.text the callout body text
 * @param {string} params.cssClass any classes for the containing element
 * @param {string} params.icon the icon src to show as an `img` element
 * @returns
 */
export function getCalloutNode({ menu, title, text, cssClass, icon }) {
  const schema = menu.schema;

  let content = getSelectedText(menu) || text || " ";

  const node = schema.nodes.div.create({ _preserve: { class: cssClass } }, [
    schema.nodes.figure.create({ _preserve: { class: "icon" } }, [
      schema.nodes.image.create({
        src: icon,
        _preserve: { class: "round" },
      }),
    ]),
    schema.nodes.article.create(null, [
      schema.nodes.heading.create(
        { level: 4 },
        schema.text(game.i18n.localize(title)),
      ),
      schema.nodes.paragraph.create(
        null,
        schema.text(game.i18n.localize(content)),
      ),
    ]),
  ]);

  return node;
}

/**
 * Creates HTML for a pull quote.
 * @param {Object} params the parameters needed for creating the HTML
 * @param {any} menu a ProseMirrorMenu instance
 * @param {string} cssClass extra classes for the containing element
 * @returns
 */
export function getPullQuoteHtml({ menu, cssClass }) {
  const quote =
    getSelectedText(menu) ||
    game.i18n.localize("DND.MENU.STYLE.PULL_QUOTE_CONTENT");
  const author = game.i18n.localize("DND.MENU.STYLE.PULL_QUOTE_AUTHOR");
  const source = game.i18n.localize("DND.MENU.STYLE.PULL_QUOTE_SOURCE");

  return `
<aside class="quote-lg ${cssClass}">
    <p><q><selection>${quote}</selection></q></p>
    <p class="author">—${author}, <em>${source}</em></p>
</aside>
`;
}
