/**
 * Inserts text in place at the cursor location in the relevant prosemirror instance.
 *
 * @param {string|null|undefined} text   The text to insert.
 * @param {any} menu           The ProseMirrorMenu instance.
 * @returns
 */
export function insertText(text, menu) {
  if (!text) {
    return;
  }

  menu.view.dispatch(menu.view.state.tr.insertText(text).scrollIntoView());
}

/**
 * @typedef InsertCalloutParams  The parameters for performing a textual replacement.
 * @property {any} menu          The ProseMirrorMenu instance.
 * @property {string} html       HTML text. Use `<selection>My Default Text</selection>` to use
 *                               a fallback value when there is no text to replace.
 */

/**
 * Replaces the current selection, if any, with the supplied HTML.
 * Supports eagerly replacing content inside of `<selection>` with
 * a highlighted selection in the editor.
 * @param {InsertCalloutParams} params   The parameters for performing a textual replacement.
 */
export function replaceSelection({ menu, html }) {
  const state = menu.view.state;
  const { $from, $to } = state.selection;

  // Replace selection default content with selected text, if any.
  let selection =
    $from && $to ? state.doc.textBetween($from.pos, $to.pos) : undefined;

  html = html.replace(/<selection>(.*?)<\/selection>/, function (match, alt) {
    return selection || alt || "";
  });

  const node = ProseMirror.dom.parseString(html);

  menu.view.dispatch(state.tr.replaceSelectionWith(node));
}
