/*
 * Page | Partner
 */
import { IModule } from "@sygnal/sse";
import { mainPartnerCard } from "../components/mainPartnerCard";
import { applicationPartnerCard } from "../components/applicationPartnerCard";
import { partnerFilter } from "../components/filterPartner";
 
export class PartnerPage implements IModule {
  constructor() {
  }
  setup() {
        
  }
  exec() {
    console.log('partner page loaded')

    // Components
        const components = document.querySelectorAll<HTMLElement>('[sse-component]');
        components.forEach(element => {
            const componentValue = element.getAttribute('sse-component');
        
            // Ensure there's an actual value before proceeding
            if (componentValue) { 
                switch (componentValue) {
        
                    case 'main-partner-card-list': 
                        const mainPartnerSection = element;  // Get the section where main partners will be rendered
                        const partnersMain = [
                            { name: 'Partner A', logoUrl: 'https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png', link: 'https://partnerA.com' },
                            { name: 'Partner B', logoUrl: 'https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png', link: 'https://partnerB.com' },
                        ];
                        mainPartnerSection.classList.add("partner-card-list"); // Add flex container class
                        partnersMain.forEach((partner) => {
                            // Assuming mainPartnerCard returns HTML for each partner, add it to the container
                            mainPartnerSection.innerHTML += mainPartnerCard(partner);  
                        });
                        break;
        
                    case 'application-partner-card-list': 
                        const appPartnerSection = element;  // Get the section where app partners will be rendered
                        const partnersApp = [
                            { logoUrl: 'https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png' },
                            { logoUrl: 'https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png' },
                        ];
                        appPartnerSection.classList.add("application-partner-card-list"); // Add flex container class
                        partnersApp.forEach((partner) => {
                            // Assuming applicationPartnerCard returns HTML for each partner, add it to the container
                            appPartnerSection.innerHTML += applicationPartnerCard(partner);
                        });
                        break;

                    case 'partner-filter': 
                        const filterSection = element; // Get the section where the filter button will be rendered
                        filterSection.classList.add("partner-filter-container"); // Add container class
                    
                        // Render the filter component inside the section
                        filterSection.innerHTML = partnerFilter();
                    
                        break;
                    

        
                    default:
                        console.log('Unknown component:', componentValue);
                        break;
                }
            }
        });
  }
}