export const mainPartnerCard = (partner: { name: string, logoUrl: string }) => {
  return `
    <div class="partner-card main-partner-card">
      <img src="${partner.logoUrl}" alt="${partner.name}" class="partner-logo" />
      <div class="partner-name">${partner.name}</div>
    </div>
  `;
};
