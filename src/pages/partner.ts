import { IModule } from "@sygnal/sse";
import { mainPartnerCard } from "../components/mainPartnerCard";
import { applicationPartnerCard } from "../components/applicationPartnerCard";
import { partnerFilter } from "../components/filterPartner";
// import { partnerSearch } from "../components/searchPartner";

interface Partner {
    logoUrl: string;
    tags: string[]; // Explicitly define tags as a string array
}

export const partnersApp: Partner[] = [
    { logoUrl: 'https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png', tags: ['Productivity'] },
    { logoUrl: 'https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png', tags: ['Communication'] },
    { logoUrl: 'https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png', tags: ['Productivity', 'Security'] },
];


export class PartnerPage implements IModule {
    constructor() { }

    setup() { }

    exec() {
        console.log('partner page loaded');

        // Components
        const components = document.querySelectorAll<HTMLElement>('[sse-component]');
        components.forEach(element => {
            const componentValue = element.getAttribute('sse-component');

            if (componentValue) {
                switch (componentValue) {
                    case 'main-partner-card-list':
                        const mainPartnerSection = element;
                        const partnersMain = [
                            { name: 'Partner A', logoUrl: 'https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png', link: 'https://partnerA.com' },
                            { name: 'Partner B', logoUrl: 'https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png', link: 'https://partnerB.com' },
                        ];
                        mainPartnerSection.classList.add("partner-card-list");
                        partnersMain.forEach(partner => {
                            mainPartnerSection.innerHTML += mainPartnerCard(partner);
                        });
                        break;

                    case 'application-partner-card-list':
                        renderApplicationPartners(element);
                        break;

                    case 'partner-filter':
                        element.classList.add("partner-filter-container");
                        element.innerHTML = partnerFilter();
                        break;

                    // case 'partner-search':
                    //     element.classList.add("partner-search-container");
                    //     element.innerHTML = partnerSearch();
                    //     break;

                    default:
                        console.log('Unknown component:', componentValue);
                        break;
                }
            }
        });
    }
}

// Renders filtered partners based on the selected tag
const filterPartnersByTag = (selectedTag: string) => {
    const appPartnerSection = document.querySelector(".application-partner-card-list");
    if (!appPartnerSection) return;

    appPartnerSection.innerHTML = ""; // Clear existing partners

    const filteredPartners = selectedTag
        ? partnersApp.filter(partner => partner.tags.includes(selectedTag))
        : partnersApp;

    filteredPartners.forEach(partner => {
        appPartnerSection.innerHTML += applicationPartnerCard(partner);
    });
};

// Attach function to global scope
(window as any).filterPartnersByTag = filterPartnersByTag;


// Renders all application partners initially
const renderApplicationPartners = (container: HTMLElement) => {
    container.classList.add("application-partner-card-list");
    partnersApp.forEach(partner => {
        container.innerHTML += applicationPartnerCard(partner);
    });
};
