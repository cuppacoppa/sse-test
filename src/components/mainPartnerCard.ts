export const mainPartnerCard = (partner: { name: string, logoUrl: string, link: string }) => {
  return `
    <div class="logo-card main-partner">
      <a href="${partner.link}" class="logo-card__link" aria-labelledby="logo-card-${partner.name}" target="_blank"></a>
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="${partner.name}" loading="lazy">
        <h3 id="logo-card-${partner.name}">${partner.name}</h3>
      </div>
    </div>
  `;
};
