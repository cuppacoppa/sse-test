"use strict";
(() => {
  // src/data/partnerData.ts
  var partnersData = {
    "partnera": {
      name: "PartnerA",
      logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png",
      Header: "Page Header",
      subHeader: "Page Sub Header",
      description: "The red glow of tail lights indicating another long drive home from work after an even longer 24-hour shift at the hospital. The shift hadnt been horrible but the constant stream of patients entering the ER meant there was no downtime. She had some of the \u201Cregulars\u201D in tonight with new ailments they were sure were going to kill them. It\u2019s amazing what a couple of Tylenol and a physical exam from the doctor did to eliminate their pain, nausea, headache, or whatever other mild symptoms they had. Sometimes she wondered if all they really needed was some interaction with others and a bit of the individual attention they received from the nurses. ",
      largeMedia: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png",
      caseStudyNumber: 3,
      caseStudyTabNames: ["tab 1", "tab 2", "tab 3"],
      caseStudySubHeading: "How We Helped Partner A",
      caseStudyProblem: "Partner A faced a challenge with scaling.",
      caseStudySolution: "We provided an innovative solution to optimize their operations.",
      caseStudyCollaboration: "Our team worked closely with Partner A to ensure seamless integration.",
      caseStudyMedia: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png"
    }
  };

  // src/components/individualPartnerPage.ts
  var individualPartnerPage = (partnerName, partnersData2) => {
    const partner = partnersData2[partnerName];
    if (!partner) {
      return `<p>Partner not found.</p>`;
    }
    return `
          <div class="partner-container">
            <!-- Partnership Subheading and Logo -->
            <div class="partner-header">
              <div class="partner-text">
                <p class="partner-subheading">${partner.subHeader}</p>
                <h1 class="partner-header">${partner.Header}</h1>
              </div>
              <div class="partner-logo">
                <img src="${partner.logoUrl}" alt="${partner.name} Logo">
              </div>
            </div>

            <!-- Main Content Section (Description) -->
            <div class="partner-main-content">
              <p class="partner-description">${partner.description}</p>
            </div>
          </div>
            
            <!-- Full-Screen Media Section -->
            <div class="partner-fullscreen-media">
              <img src="${partner.largeMedia}" alt="${partner.name} Feature Image">
            </div>

  

  
          <div class="partner-case-study">
            <!-- Tab Section (Navigation for the case study) -->
            <div class="case-study-tabs">
              <!-- Tabs will be dynamically inserted here -->
            </div>

          <div class="case-study-content">
            <!-- Content will be dynamically inserted here -->
          </div>


            <!-- Case Study Content -->
            <div class="case-study-content">
              <div class="case-study-left">
                <!-- Media (Image) Section -->
                <img src="${partner.caseStudyMedia}" alt="Case Study Media" class="case-study-media">
              </div>
              <div class="case-study-right">
                <h3 class="case-study-subheading">${partner.caseStudySubHeading}</h3>

                <!-- Case Study Text Sections -->
                <div class="case-study-section">
                  <p class="case-study-title">Problem</p>
                  <p class="case-study-text">${partner.caseStudyProblem}</p>
                </div>

                <div class="case-study-section">
                  <p class="case-study-title">Solution</p>
                  <p class="case-study-text">${partner.caseStudySolution}</p>
                </div>

                <div class="case-study-section">
                  <p class="case-study-title">Collaboration</p>
                  <p class="case-study-text">${partner.caseStudyCollaboration}</p>
                </div>
              </div>
            </div>
          </div>

      </div>
    `;
  };
  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const partnerName = urlParams.get("partner");
    console.log("Partner Name from URL:", partnerName);
    if (partnerName) {
      const formattedPartnerName = partnerName.toLowerCase();
      const partner = partnersData[formattedPartnerName];
      console.log("Partner Object:", partner);
      const components = document.querySelectorAll("[sse-component]");
      components.forEach((element) => {
        const componentValue = element.getAttribute("sse-component");
        if (componentValue) {
          switch (componentValue) {
            case "partner-page":
              const partnerPageSection = element;
              partnerPageSection.innerHTML += individualPartnerPage(formattedPartnerName, partnersData);
          }
        }
      });
    }
    if (partnerName) {
      let updateTabContent2 = function(tabIndex) {
        const content = [
          partner.caseStudyProblem,
          partner.caseStudySolution,
          partner.caseStudyCollaboration
        ];
        caseStudyContentContainer.innerHTML = `
          <h2>${partner.caseStudySubHeading}</h2>
          <p><strong>Problem:</strong> ${content[tabIndex]}</p>
        `;
      };
      var updateTabContent = updateTabContent2;
      const formattedPartnerName = partnerName.toLowerCase();
      const partner = partnersData[formattedPartnerName];
      const caseStudyTabsContainer = document.querySelector(".case-study-tabs");
      const caseStudyContentContainer = document.querySelector(".case-study-content");
      partner.caseStudyNumber && partner.caseStudyTabNames.forEach((tabName, index) => {
        const tabButton = document.createElement("button");
        tabButton.classList.add("tab-button");
        tabButton.dataset.tab = String(index + 1);
        tabButton.innerHTML = tabName;
        caseStudyTabsContainer.appendChild(tabButton);
        tabButton.addEventListener("click", () => {
          document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));
          tabButton.classList.add("active");
          updateTabContent2(index);
        });
      });
      updateTabContent2(0);
    }
  });
})();
//# sourceMappingURL=individualPartnerPage.js.map
