"use strict";
(() => {
  // src/components/mainPartnerCard.ts
  var mainPartnerCard = (partner) => {
    return `
    <div class="logo-card">
        <a href="${partner.link}" class="logo-card__link" aria-labelledby="logo-card-${partner.name.replace(/\s+/g, "-")}"></a>
        <div class="logo-card__content">
            <img src="${partner.logoUrl}" alt="${partner.name} logo" loading="lazy">
            <h3 id="logo-card-${partner.name.replace(/\s+/g, "-")}">${partner.name}</h3>
        </div>
    </div>
  `;
  };
})();
//# sourceMappingURL=mainPartnerCard.js.map
