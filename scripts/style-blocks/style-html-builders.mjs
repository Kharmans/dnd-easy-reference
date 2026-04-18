/**
 * @typedef InsertCalloutParams
 * @property {any} menu
 * @property {string} [cssClass]
 * @property {string} icon
 * @property {string} title
 * @property {string} content
 */

/**
 * Builds a callout with an image, header text, and body text.
 * @param {InsertCalloutParams} params
 * @returns {true}
 */
export function insertCallout({ menu, cssClass, icon, title, content }) {
  const schema = menu.schema;

  const divNode = schema.nodes.div.create({ _preserve: { class: cssClass } }, [
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

  menu.view.dispatch(menu.view.state.tr.replaceSelectionWith(divNode));

  return true;
}

/**
 * @typedef InsertBlockParams
 * @property {any} menu
 * @property {string} cssClass
 * @property {string} type
 */

/**
 * Toggle the given selection by wrapping it in a given block of `type` or lifting it out of one.
 * @param {InsertBlockParams} params
 * @returns {void}
 */
export function insertBlock({ menu, cssClass, type }) {
  return menu._toggleBlock(
    menu.schema.nodes[type],
    foundry.prosemirror.commands.wrapIn,
    { attrs: { _preserve: { class: cssClass } } },
  );
}
