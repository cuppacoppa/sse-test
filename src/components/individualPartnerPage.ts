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





    if (partnerName) {
      const formattedPartnerName = partnerName.toLowerCase(); // Normalize the partner name
  
      // Ensure the partner exists in the partnersData object
      const partner = partnersData[formattedPartnerName];
    
      const caseStudyTabsContainer = document.querySelector('.case-study-tabs') as HTMLElement;
      const caseStudyContentContainer = document.querySelector('.case-study-content') as HTMLElement;

      // Generate tabs dynamically based on `caseStudyNumber` and `caseStudyTabNames`
      partner.caseStudyNumber && partner.caseStudyTabNames.forEach((tabName, index) => {
        const tabButton = document.createElement('button');
        tabButton.classList.add('tab-button');
        tabButton.dataset.tab = String(index + 1);
        tabButton.innerHTML = tabName;
        caseStudyTabsContainer.appendChild(tabButton);

        tabButton.addEventListener('click', () => {
          // Remove 'active' class from all tabs and add it to the clicked tab
          document.querySelectorAll('.tab-button').forEach((btn) => btn.classList.remove('active'));
          tabButton.classList.add('active');
          
          // Update content based on selected tab
          updateTabContent(index);
        });
      });

      // Function to update the content displayed based on selected tab
      function updateTabContent(tabIndex: number) {
        const content = [
          partner.caseStudyProblem,
          partner.caseStudySolution,
          partner.caseStudyCollaboration,
        ];

        caseStudyContentContainer.innerHTML = `
          <h2>${partner.caseStudySubHeading}</h2>
          <p><strong>Problem:</strong> ${content[tabIndex]}</p>
        `;
      }

      // Set default content for the first tab
      updateTabContent(0);
  }
})

  
