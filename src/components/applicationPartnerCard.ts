export const applicationPartnerCard = (partner: { name: string, logoUrl: string }) => {
    return `
      <div class="partner-card app-partner-card">
        <img src="${partner.logoUrl}" alt="${partner.name}" class="partner-logo" />
      </div>
    `;
  };
  