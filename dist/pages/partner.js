"use strict";
(() => {
  // src/components/mainPartnerCard.ts
  var mainPartnerCard = (partner) => {
    return `
    <div class="logo-card main-partner">
      <a href="${partner.link}" class="main-partner__link" aria-labelledby="logo-card-${partner.name}" target="_blank"></a>
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="${partner.name}" loading="lazy">
        <h3 id="logo-card-${partner.name}">${partner.name}</h3>
      </div>
    </div>
  `;
  };

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

  // src/components/filterPartner.ts
  var partnerFilter = () => {
    return `
      <div class="filter-container">
        <button class="filter-button">Filter</button>
        <div class="filter-dropdown">
          <label for="partner-type">Partner Type</label>
          <select id="partner-type">
            <option value="">Select Type</option>
            <option value="main">Main Partner</option>
            <option value="application">Application Partner</option>
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
      button.addEventListener("click", () => {
        dropdown.classList.toggle("open");
        console.log("hi");
      });
    }
  });

  // src/components/searchPartner.ts
  var partnerSearch = () => {
    return `
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search Partners..." 
          id="partner-search" 
        />
      </div>
    `;
  };
  var searchComponent = document.querySelector('[sse-component="partner-search"]');
  if (searchComponent) {
    searchComponent.innerHTML = partnerSearch();
  }

  // src/pages/partner.ts
  var PartnerPage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      console.log("partner page loaded");
      const components = document.querySelectorAll("[sse-component]");
      components.forEach((element) => {
        const componentValue = element.getAttribute("sse-component");
        if (componentValue) {
          switch (componentValue) {
            case "main-partner-card-list":
              const mainPartnerSection = element;
              const partnersMain = [
                { name: "Partner A", logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png", link: "https://partnerA.com" },
                { name: "Partner B", logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png", link: "https://partnerB.com" }
              ];
              mainPartnerSection.classList.add("partner-card-list");
              partnersMain.forEach((partner) => {
                mainPartnerSection.innerHTML += mainPartnerCard(partner);
              });
              break;
            case "application-partner-card-list":
              const appPartnerSection = element;
              const partnersApp = [
                { logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png" },
                { logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png" }
              ];
              appPartnerSection.classList.add("application-partner-card-list");
              partnersApp.forEach((partner) => {
                appPartnerSection.innerHTML += applicationPartnerCard(partner);
              });
              break;
            case "partner-filter":
              const filterSection = element;
              filterSection.classList.add("partner-filter-container");
              filterSection.innerHTML = partnerFilter();
              break;
            case "partner-search":
              const searchSection = element;
              searchSection.classList.add("partner-search-container");
              searchSection.innerHTML = partnerSearch();
              break;
            default:
              console.log("Unknown component:", componentValue);
              break;
          }
        }
      });
    }
  };
})();
//# sourceMappingURL=partner.js.map
