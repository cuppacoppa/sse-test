import { partnersData, PartnerData } from "../data/partnerData";


export const individualPartnerPage = (partnerName: string, partnersData: { [key: string]: PartnerData }) => {
    const partner = partnersData[partnerName];
  
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
              <button class="tab-button active" data-tab="1">Tab 1</button>
              <button class="tab-button" data-tab="2">Tab 2</button>
              <button class="tab-button" data-tab="3">Tab 3</button>
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
  
  window.addEventListener('load', () => {
    // Retrieve the 'partner' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const partnerName = urlParams.get('partner'); // Access the 'partner' query parameter
  
    console.log('Partner Name from URL:', partnerName); // Debugging: Check if we got the correct partner name
  
    if (partnerName) {
      const formattedPartnerName = partnerName.toLowerCase(); // Normalize the partner name
  
      // Ensure the partner exists in the partnersData object
      const partner = partnersData[formattedPartnerName];
  
      console.log('Partner Object:', partner);

       // Components
    const components = document.querySelectorAll<HTMLElement>('[sse-component]');
    components.forEach(element => {
        const componentValue = element.getAttribute('sse-component');

        if (componentValue) {
            switch (componentValue) {
                case 'partner-page':
                  const partnerPageSection = element;
                  partnerPageSection.innerHTML += individualPartnerPage(formattedPartnerName, partnersData);

            }
        }
    })
    }

    
  })