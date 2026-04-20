import { getSelectedText } from "../prose-mirror/utils.mjs";

/**
 * 
 * @param {*} params 
 * @returns 
 */
export function getCalloutNode({ menu, title, text, cssClass, icon }) {
  const schema = menu.schema;

  let content = getSelectedText(menu);

  if (!content?.length) {
    content = text ?? " ";
  }

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

export function getPullQuoteHtml({ cssClass }) {
  const quote = game.i18n.localize("DND.MENU.STYLE.PULL_QUOTE_CONTENT");
  const author = game.i18n.localize("DND.MENU.STYLE.PULL_QUOTE_AUTHOR");
  const source = game.i18n.localize("DND.MENU.STYLE.PULL_QUOTE_SOURCE");

  return `
<aside class="quote-lg ${cssClass}">
    <p><q><selection>${quote}</selection></q></p>
    <p class="author">—${author}, <em>${source}</em></p>
</aside>
`;
}
