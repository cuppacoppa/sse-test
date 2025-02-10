export const mainPartnerCard = (partner: { name: string, logoUrl: string, link?: string }) => {
  return `
    <div class="logo-card main-partner">
    ${partner.link ? `<a href="${partner.link}" class="main-partner__link" aria-labelledby="logo-card-${partner.name}" target="_blank"></a>` : ""}
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="${partner.name}" loading="lazy">
        <h3 id="logo-card-${partner.name}">${partner.name}</h3>
        
        ${partner.link
          ? `<div class="main-partner__icon">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.67678 0L6.54547 1.13131L12.5253 7.11111L0.404053 7.11111L0.404053 8.72727H12.5253L6.54547 14.8687L7.67678 16L15.596 7.91919L7.67678 0Z" fill="currentColor"></path>
              </svg>
            </div>` 
          : ""}
      </div>
    </div>
  `;
};
