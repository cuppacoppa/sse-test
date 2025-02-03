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
import { bigPartnerCard } from "./components/bigPartnerCard";

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
    
                case 'big-partner-card-list': 
                    const container = element;
                    const partners = [
                        { name: 'Partner A', description: 'Description for Partner A', logoUrl: 'path/to/logoA.png' },
                        { name: 'Partner B', description: 'Description for Partner B', logoUrl: 'path/to/logoB.png' },
                    ];
                    partners.forEach((partner) => {
                        container.innerHTML += bigPartnerCard(partner);
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