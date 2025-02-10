"use strict";
(() => {
  // src/components/applicationPartnerCard.ts
  var applicationPartnerCard = (partner) => {
    return `
    <div class="logo-card application-partner">
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="Application Partner Logo" loading="lazy">
      </div>
    </div>
  `;
  };

  // src/pages/partner.ts
  var partnersApp = [
    { logoUrl: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa34cea35c6f2a2eda70bb_Oracle_Logo.svg.png", tags: ["Productivity"] },
    { logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png", tags: ["Communication"] },
    { logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png", tags: ["Productivity", "Security"] }
  ];
  var filterPartnersByTag = (selectedTag) => {
    const appPartnerSection = document.querySelector(".application-partner-card-list");
    if (!appPartnerSection)
      return;
    appPartnerSection.innerHTML = "";
    const filteredPartners = selectedTag ? partnersApp.filter((partner) => partner.tags.includes(selectedTag)) : partnersApp;
    filteredPartners.forEach((partner) => {
      appPartnerSection.innerHTML += applicationPartnerCard(partner);
    });
  };
  window.filterPartnersByTag = filterPartnersByTag;

  // src/components/filterPartner.ts
  var partnerFilter = () => {
    const uniqueTags = /* @__PURE__ */ new Set();
    partnersApp.forEach((partner) => {
      partner.tags.forEach((tag) => uniqueTags.add(tag));
    });
    const tagOptions = Array.from(uniqueTags).map((tag) => `<option value="${tag}">${tag}</option>`).join("");
    return `
      <div class="filter-container">
        <button class="filter-button">Filter</button>
        <div class="filter-dropdown">
          <label for="partner-type">Filter by Tag</label>
          <select id="partner-type">
            <option value="">All Partners</option>
            ${tagOptions} 
          </select>
        </div>
      </div>
    `;
  };
  window.addEventListener("load", () => {
    const filterComponent = document.querySelector('[sse-component="partner-filter"]');
    if (filterComponent) {
      filterComponent.innerHTML = partnerFilter();
      const button = filterComponent.querySelector(".filter-button");
      const dropdown = filterComponent.querySelector(".filter-dropdown");
      const select = filterComponent.querySelector("#partner-type");
      button.addEventListener("click", () => {
        dropdown.classList.toggle("open");
      });
      select.addEventListener("change", () => {
        const selectedTag = select.value;
        if (typeof window.filterPartnersByTag === "function") {
          window.filterPartnersByTag(selectedTag);
        } else {
          console.error("filterPartnersByTag is not defined");
        }
      });
    }
  });
})();
//# sourceMappingURL=filterPartner.js.map
