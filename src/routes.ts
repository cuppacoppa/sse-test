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

import { HomePage } from "./pages/home";
import { RouteDispatcher } from "@sygnal/sse";
import { Site } from "./site";
import { PartnerPage } from "./pages/partner";
<<<<<<< HEAD
=======
import { IndividualPartner } from "./pages/individualPartner";
>>>>>>> dev

export const routeDispatcher = (): RouteDispatcher => {
    
    var routeDispatcher = new RouteDispatcher(Site);
    routeDispatcher.routes = {

        // Site pages
        '/': HomePage,
<<<<<<< HEAD
        '/partner/*': PartnerPage, 
        '/partner': PartnerPage, 
=======
        '/partner/*': IndividualPartner,  // Dynamic route for individual partner
        '/partner': PartnerPage,

>>>>>>> dev
        // TEST Pages
    };

    return routeDispatcher;
}
