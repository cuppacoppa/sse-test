"use strict";
(() => {
  // src/components/mainPartnerCard.ts
  var mainPartnerCard = (partner) => {
    return `
    <div class="partner-card main-partner-card">
      <img src="${partner.logoUrl}" alt="${partner.name}" class="partner-logo" />
      <div class="partner-name">${partner.name}</div>
    </div>
  `;
  };
})();
//# sourceMappingURL=mainPartnerCard.js.map
