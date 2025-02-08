import { IModule } from "@sygnal/sse";
import { individualPartnerPage } from "../components/individualPartnerPage";
 
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


export class IndividualPartner implements IModule {

  constructor() {
  }

  setup() {
    
  }

  exec() {

    const path = window.location.pathname;
    const segments = path.split("/");
    const partnerName = segments.pop() || segments.pop(); // Handles trailing slash

    // 2. Find the corresponding partner object from partnersData
    const validPartnerName = partnerName as string;
    const formattedPartnerName = validPartnerName.toLowerCase();

    console.log(formattedPartnerName)
    // Now you can use validPartnerName safely
    const partner = partnersData[formattedPartnerName];
    console.log(partner);

    // CALL THE INDIVIDUALPARTNER.TS COMPONENT HERE TO GENERATE HTML
    const partnerHTML = individualPartnerPage(formattedPartnerName, partnersData);
    console.log(partnerHTML)
    const partnerNameLowerCase =  partner.name.toLowerCase();

    // Redirect to partner/learn page with partnerName as a URL parameter
    window.location.replace(`https://mats-dapper-site-d83a81.webflow.io/partner/learn?partner=${partnerNameLowerCase}`);
    

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
}
