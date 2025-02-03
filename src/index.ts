/*
 * SITE  
 * Main entry point
 * 
 * https://engine.sygnal.com/
 * 
 * ENGINE MODE
 * ?engine.mode=dev
 * ?engine.mode=prod
 * 
 */

import { VERSION } from "./version";
import { routeDispatcher } from "./routes";
import { initSSE } from "@sygnal/sse"; 
import { ComponentManager } from "./engine/component-manager";
import { TestComponent } from "./components/test";
import { mainPartnerCard } from "./components/mainPartnerCard";
import { applicationPartnerCard } from "./components/applicationPartnerCard";

interface SiteGlobalDataType {
    // Define properties and their types for SiteDataType
    // For example:
    // someProperty?: string;
    // anotherProperty?: number;
    // Add other properties as needed
}

// Global vars
const SITE_NAME = 'Site';

// // Global object
// window[SITE_NAME] = window[SITE_NAME] || {}; 
// var SiteData = window[SITE_NAME];

// Extend the Window interface to include globals
// as a Typescript accessibility convenience
declare global {
    interface Window {

        // fsAttributes
        fsAttributes: [string, (filterInstances: any[]) => void][];

        // Site global data
        Site: SiteGlobalDataType;

        Webflow: {
            require: (module: string) => {
                destroy: () => void; 
                init: () => void;
            };
          };

        sa5: any;
//        sa5: Array<[string, (accordion: any, index: number) => void]>;

        componentManager: ComponentManager;

    }
}

window.componentManager = new ComponentManager();

// Init SSE Engine
initSSE();

// Perform setup, sync
const setup = () => {
    
    console.log(`${SITE_NAME} package init v${VERSION}`);
    
    routeDispatcher().setupRoute(); 

}

// Perform exec, async
// After DOM content loaded 
const exec = () => {
    
    routeDispatcher().execRoute(); 

    // Components
    const components = document.querySelectorAll<HTMLElement>('[sse-component]');
    components.forEach(element => {
        const componentValue = element.getAttribute('sse-component');
    
        // Ensure there's an actual value before proceeding
        if (componentValue) { 
            switch (componentValue) {
                case 'test':
                    (new TestComponent(element)).exec();
                    break;
    
                case 'main-partner-card-list': 
                    const mainPartnerSection = element;  // Get the section where main partners will be rendered
                    const partnersMain = [
                        { name: 'Partner A', logoUrl: 'path/to/partnerA-logo.png', link: 'https://partnerA.com' },
                        { name: 'Partner B', logoUrl: 'path/to/partnerB-logo.png', link: 'https://partnerB.com' },
                    ];
                
                    partnersMain.forEach((partner) => {
                        // Assuming mainPartnerCard returns HTML for each partner, add it to the container
                        mainPartnerSection.innerHTML += mainPartnerCard(partner);  
                    });
                    break;
    
                    case 'application-partner-card-list': 
                    const appPartnerSection = element;  // Get the section where app partners will be rendered
                    const partnersApp = [
                        { logoUrl: 'path/to/app-logoA.png' },
                        { logoUrl: 'path/to/app-logoB.png' },
                    ];
                
                    partnersApp.forEach((partner) => {
                        // Assuming applicationPartnerCard returns HTML for each partner, add it to the container
                        appPartnerSection.innerHTML += applicationPartnerCard(partner);
                    });
                    break;
    
                default:
                    console.log('Unknown component:', componentValue);
                    break;
            }
        }
    });
    

}

/**
 * Initialize
 */

// Perform setup, sync
setup();

// Perform exec, async
if (document.readyState !== 'loading') {
    exec();
} else {
    document.addEventListener("DOMContentLoaded", exec);
}
