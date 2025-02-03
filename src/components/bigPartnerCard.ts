// src/components/PartnerCard.ts

export function PartnerCard(partner: { name: string; description: string; logoUrl: string }): string {
    return `
      <div class="partner-card">
        <img src="${partner.logoUrl}" alt="${partner.name} logo" class="partner-card__logo" />
        <h2 class="partner-card__name">${partner.name}</h2>
        <p class="partner-card__description">${partner.description}</p>
      </div>
    `;
  }
  