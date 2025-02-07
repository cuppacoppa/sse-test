"use strict";
(() => {
  // src/pages/individualPartner.ts
  var IndividualPartner = class {
    constructor() {
    }
    setup() {
      const partnersMainPage = [
        {
          name: "Partner A",
          logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png",
          Header: "Page Header",
          subHeader: "Page Sub Header",
          description: "description",
          largeMedia: "photo or video link here",
          caseStudySubHeading: "caseStudySubHeading",
          caseStudyProblem: "caseStudyProblem",
          caseStudySolution: "caseStudySolution",
          caseStudyCollaboration: "caseStudyCollaboration",
          caseStudyMedia: "case study photo or video link here"
        },
        { name: "Partner B", logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png" }
      ];
    }
    exec() {
      console.log("individual partner page");
    }
  };
})();
//# sourceMappingURL=individualPartner.js.map
