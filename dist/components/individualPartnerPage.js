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
      caseStudySubHeading: "How We Helped Partner A",
      caseStudyProblem: "Partner A faced a challenge with scaling.",
      caseStudySolution: "We provided an innovative solution to optimize their operations.",
      caseStudyCollaboration: "Our team worked closely with Partner A to ensure seamless integration.",
      caseStudyMedia: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png"
    },
    "partnerb": {
      name: "PartnerB",
      logoUrl: "https://via.placeholder.com/150x150",
      Header: "Partner B Header",
      subHeader: "Partner B Sub Header",
      description: "This is a detailed description of Partner B.",
      largeMedia: "https://via.placeholder.com/800x400",
      caseStudySubHeading: "How We Helped Partner B",
      caseStudyProblem: "Partner B faced challenges in customer acquisition.",
      caseStudySolution: "We helped them develop targeted marketing strategies.",
      caseStudyCollaboration: "Our team worked on designing and implementing the strategy.",
      caseStudyMedia: "https://via.placeholder.com/600x300"
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

  

  
          <!-- Case Study Section -->
          <div class="partner-case-study">
              <div class="case-study-left">
                  <h3>${partner.caseStudySubHeading}</h3>
                  <p><strong>Problem:</strong> ${partner.caseStudyProblem}</p>
                  <p><strong>Solution:</strong> ${partner.caseStudySolution}</p>
              </div>
              <div class="case-study-right">
                  <img src="${partner.caseStudyMedia}" alt="Case Study Media">
                  <p><strong>Collaboration:</strong> ${partner.caseStudyCollaboration}</p>
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
  });
})();
//# sourceMappingURL=individualPartnerPage.js.map
