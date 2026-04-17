// TODO: Consider making this a prose-mirror/utils.mjs situation

/**
 * Inserts text in place at the cursor location in the relevant prosemirror instance.
 *
 * @param {string|null} text   The text to insert.
 * @param {any} menu           The ProseMirrorMenu instance.
 * @returns
 */
export function insertText(text, menu) {
  if (!text) {
    return;
  }

  menu.view.dispatch(menu.view.state.tr.insertText(text).scrollIntoView());
}
