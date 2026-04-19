export function getCalloutHtml({ title, text, cssClass, icon }) {
  return `
<div class="${cssClass}">
  <figure class="icon">
    <img src="${icon}" class="round" />
  </figure>
  <article>
    <h4>${game.i18n.localize(title)}</h4>
    <p>
      <selection>${game.i18n.localize(text)}</selection>
    </p>
  </article>
</div>`;
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
