// individualPartner.ts
interface PartnerData {
    name: string;
    logoUrl: string;
    Header: string;
    subHeader: string;
    description: string;
    largeMedia: string;
    caseStudySubHeading: string;
    caseStudyProblem: string;
    caseStudySolution: string;
    caseStudyCollaboration: string;
    caseStudyMedia: string;
  }
  
  export const partnersData: { [key: string]: PartnerData } = {
    "partnera": {
      name: "PartnerA",
      logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png",
      Header: "Page Header",
      subHeader: "Page Sub Header",
      description: "This is a detailed description of Partner A.",
      largeMedia: "https://via.placeholder.com/800x400",
      caseStudySubHeading: "How We Helped Partner A",
      caseStudyProblem: "Partner A faced a challenge with scaling.",
      caseStudySolution: "We provided an innovative solution to optimize their operations.",
      caseStudyCollaboration: "Our team worked closely with Partner A to ensure seamless integration.",
      caseStudyMedia: "https://via.placeholder.com/600x300"
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
    },
  
  };


export const individualPartnerPage = (partnerName: string, partnersData: { [key: string]: PartnerData }) => {
    const partner = partnersData[partnerName];
  
    if (!partner) {
      return `<p>Partner not found.</p>`;
    }
  
    return `
      <div class="partner-container">
          <!-- Partnership Subheading and Logo -->
          <div class="partner-header">
              <div class="partner-logo">
                  <img src="${partner.logoUrl}" alt="Partner Logo">
              </div>
              <div class="partner-subheading">
                  <h2>${partner.Header}</h2>
              </div>
          </div>
  
          <!-- Main Content Section (Header and Description) -->
          <div class="partner-main-content">
              <h1>${partner.Header}</h1>
              <p>${partner.description}</p>
          </div>
  
          <!-- Large Media Section -->
          <div class="partner-large-media">
              <img src="${partner.largeMedia}" alt="Large Media" />
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
  