"use strict";
(() => {
  // src/version.ts
  var VERSION = "0.1.0";

  // src/pages/home.ts
  var HomePage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
    }
  };

  // node_modules/@sygnal/sse/dist/script.js
  var ScriptElement = class extends HTMLScriptElement {
    constructor(src, config) {
      super();
      this.src = src;
      if (config) {
        if (config.type) {
          this.type = config.type;
        }
        if (config.id) {
          this.id = config.id;
        }
        if (config.async !== void 0) {
          this.async = config.async;
        }
        if (config.defer !== void 0) {
          this.defer = config.defer;
        }
        if (config.customAttributes) {
          for (const [key, value] of Object.entries(config.customAttributes)) {
            this.setAttribute(key, value);
          }
        }
      }
    }
    appendTo(target = "body") {
      const parent = target === "head" ? document.head : document.body;
      parent.appendChild(this);
    }
    prependTo(target = "body") {
      const parent = target === "head" ? document.head : document.body;
      parent.prepend(this);
    }
  };
  customElements.define("custom-script", ScriptElement, { extends: "script" });

  // node_modules/@sygnal/sse/dist/page.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var Page = class {
    static loadCSS(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
    static loadEngineCSS(cssFileName) {
      let libPath = window.SSE.baseUrl;
      const cssURL = `${libPath}/css/${cssFileName}`;
      this.loadCSS(cssURL);
    }
    static loadStyle(css) {
      const style = document.createElement("style");
      style.innerText = css;
      document.head.appendChild(style);
    }
    static replaceScriptSource(element, newSrc) {
      element.src = newSrc;
    }
    static replaceCSSLink(element, newHref) {
      element.href = newHref;
    }
    static prependToTitle(text) {
      document.title = `${text}${document.title}`;
    }
    static getCurrentScriptUrl() {
      if (document.currentScript) {
        const currentScript = document.currentScript;
        return currentScript.src;
      }
      console.error("document.currentScript is not supported in this browser.");
      return null;
    }
    static getCurrentScriptBaseUrl() {
      const currentScript = document.currentScript;
      if (currentScript) {
        const scriptURL = new URL(currentScript.src);
        const origin = scriptURL.origin;
        const path = scriptURL.pathname.substring(0, scriptURL.pathname.lastIndexOf("/"));
        const baseURL = `${origin}${path}`;
        return baseURL;
      } else {
        console.error("Unable to determine the currently executing script.");
      }
      return void 0;
    }
    static findAncestorWithAttribute(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement;
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static getAncestorAttributeValue(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement.getAttribute(attributeName);
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static hasAncestorWithAttribute(element, attributeName) {
      return this.findAncestorWithAttribute(element, attributeName) !== null;
    }
    static convertToPixels(value, contextElement = document.documentElement) {
      const match = value.match(/^(-?\d+\.?\d*)(rem|em|px|vh|vw|%)$/);
      if (!match)
        throw new Error("Invalid value format");
      const [, amountStr, unit] = match;
      const amount = parseFloat(amountStr);
      switch (unit) {
        case "px":
          return amount;
        case "rem":
          return amount * parseFloat(getComputedStyle(document.documentElement).fontSize);
        case "em":
          return amount * parseFloat(getComputedStyle(contextElement).fontSize);
        case "vh":
          return amount * window.innerHeight / 100;
        case "vw":
          return amount * window.innerWidth / 100;
        case "%":
          return amount * contextElement.clientWidth / 100;
        default:
          throw new Error("Unsupported unit");
      }
    }
    static getResponseHeader(headerName, url = void 0) {
      return __awaiter(this, void 0, void 0, function* () {
        const headers = yield this.getResponseHeaders(url);
        if (!headers)
          return void 0;
        if (!headers.has(headerName))
          return void 0;
        return headers.get(headerName) || void 0;
      });
    }
    static getResponseHeaders(url = void 0) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!url) {
            url = window.location.href;
          }
          const response = yield fetch(url, {
            method: "HEAD"
          });
          return response.headers;
        } catch (error) {
          console.error("Error checking reverse proxy header:", error);
        }
        return void 0;
      });
    }
  };
  Page.Head = class {
    static loadScript(src, config) {
      const script = new ScriptElement(src, config);
      script.appendTo("head");
    }
  };
  Page.Body = class {
    static loadScript(src, config) {
      const script = new ScriptElement(src, config);
      script.appendTo("body");
    }
  };

  // node_modules/js-cookie/dist/js.cookie.mjs
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init(defaultConverter, { path: "/" });

  // node_modules/@sygnal/sse/dist/routeDispatcher.js
  var RouteDispatcher = class {
    constructor(SiteClass) {
      this._SiteClass = SiteClass;
    }
    matchRoute(path) {
      for (const route in this.routes) {
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          if (path.startsWith(baseRoute)) {
            return this.routes[route];
          }
        } else if (route === path) {
          return this.routes[route];
        }
      }
      return null;
    }
    setupRoute() {
      const site = new this._SiteClass();
      site.setup();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.setup();
      } else {
      }
    }
    execRoute() {
      const site = new this._SiteClass();
      site.exec();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.exec();
      } else {
      }
    }
  };

  // node_modules/@sygnal/sse/dist/index.js
  function initSSE() {
    if (!window.SSE) {
      window.SSE = {};
    }
    window.SSE.baseUrl = Page.getCurrentScriptBaseUrl();
  }

  // src/site.ts
  var Site = class {
    constructor() {
    }
    setup() {
      Page.loadEngineCSS("site.css");
    }
    exec() {
    }
  };

  // src/components/mainPartnerCard.ts
  var mainPartnerCard = (partner) => {
    return `
    <div class="logo-card main-partner">
    ${partner.link ? `<a href="${partner.link}" class="main-partner__link" aria-labelledby="logo-card-${partner.name}" target="_blank"></a>` : ""}
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="${partner.name}" loading="lazy">
        <h3 id="logo-card-${partner.name}">${partner.name}</h3>
        
        ${partner.link ? `<div class="main-partner__icon">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.67678 0L6.54547 1.13131L12.5253 7.11111L0.404053 7.11111L0.404053 8.72727H12.5253L6.54547 14.8687L7.67678 16L15.596 7.91919L7.67678 0Z" fill="currentColor"></path>
              </svg>
            </div>` : ""}
      </div>
    </div>
  `;
  };

  // src/components/applicationPartnerCard.ts
  var applicationPartnerCard = (partner) => {
    return `
    <div class="logo-card application-partner">
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="Application Partner Logo" loading="lazy">
      </div>
    </div>
  `;
  };

  // src/components/filterPartner.ts
  var partnerFilter = () => {
    const uniqueTags = /* @__PURE__ */ new Set();
    partnersApp.forEach((partner) => {
      partner.tags.forEach((tag) => uniqueTags.add(tag));
    });
    const tagOptions = Array.from(uniqueTags).map((tag) => `<option value="${tag}">${tag}</option>`).join("");
    return `
      <div class="filter-container">
        <button class="filter-button">Filter</button>
        <div class="filter-dropdown">
          <label for="partner-type">Filter by Tag</label>
          <select id="partner-type">
            <option value="">All Partners</option>
            ${tagOptions} 
          </select>
        </div>
      </div>
    `;
  };
  window.addEventListener("load", () => {
    const filterComponent = document.querySelector('[sse-component="partner-filter"]');
    if (filterComponent) {
      filterComponent.innerHTML = partnerFilter();
      const button = filterComponent.querySelector(".filter-button");
      const dropdown = filterComponent.querySelector(".filter-dropdown");
      const select = filterComponent.querySelector("#partner-type");
      button.addEventListener("click", () => {
        dropdown.classList.toggle("open");
      });
      select.addEventListener("change", () => {
        const selectedTag = select.value;
        if (typeof window.filterPartnersByTag === "function") {
          window.filterPartnersByTag(selectedTag);
        } else {
          console.error("filterPartnersByTag is not defined");
        }
      });
    }
  });

  // src/pages/partner.ts
  var partnersApp = [
    { logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png", tags: ["Productivity"] },
    { logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png", tags: ["Communication"] },
    { logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png", tags: ["Productivity", "Security"] }
  ];
  var PartnerPage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      console.log("partner page loaded");
      const components = document.querySelectorAll("[sse-component]");
      components.forEach((element) => {
        const componentValue = element.getAttribute("sse-component");
        if (componentValue) {
          switch (componentValue) {
            case "main-partner-card-list":
              const mainPartnerSection = element;
              const partnersMain = [
                { name: "Partner A", logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png", link: "https://partnerA.com" },
                { name: "Partner B", logoUrl: "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_1280.png" }
              ];
              mainPartnerSection.classList.add("partner-card-list");
              partnersMain.forEach((partner) => {
                mainPartnerSection.innerHTML += mainPartnerCard(partner);
              });
              break;
            case "application-partner-card-list":
              renderApplicationPartners(element);
              break;
            case "partner-filter":
              element.classList.add("partner-filter-container");
              element.innerHTML = partnerFilter();
              break;
            default:
              console.log("Unknown component:", componentValue);
              break;
          }
        }
      });
    }
  };
  var filterPartnersByTag = (selectedTag) => {
    const appPartnerSection = document.querySelector(".application-partner-card-list");
    if (!appPartnerSection)
      return;
    appPartnerSection.innerHTML = "";
    const filteredPartners = selectedTag ? partnersApp.filter((partner) => partner.tags.includes(selectedTag)) : partnersApp;
    filteredPartners.forEach((partner) => {
      appPartnerSection.innerHTML += applicationPartnerCard(partner);
    });
  };
  window.filterPartnersByTag = filterPartnersByTag;
  var renderApplicationPartners = (container) => {
    container.classList.add("application-partner-card-list");
    partnersApp.forEach((partner) => {
      container.innerHTML += applicationPartnerCard(partner);
    });
  };

  // src/components/individualPartnerPage.ts
  var individualPartnerPage = (partnerName, partnersData2) => {
    const partner = partnersData2[partnerName];
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

  // src/pages/individualPartner.ts
  var partnersData = {
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
    }
  };
  var IndividualPartner = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      const path = window.location.pathname;
      const segments = path.split("/");
      const partnerName = segments.pop() || segments.pop();
      const validPartnerName = partnerName;
      const formattedPartnerName = validPartnerName.toLowerCase();
      console.log(formattedPartnerName);
      const partner = partnersData[formattedPartnerName];
      console.log(partner);
      const partnerHTML = individualPartnerPage(formattedPartnerName, partnersData);
      console.log(partnerHTML);
      const partnerNameLowerCase = partner.name.toLowerCase();
      window.location.replace(`https://mats-dapper-site-d83a81.webflow.io/partner/learn?partner=${partnerNameLowerCase}`);
      const components = document.querySelectorAll("[sse-component]");
      components.forEach((element) => {
        const componentValue = element.getAttribute("sse-component");
        if (componentValue) {
          switch (componentValue) {
            case "partner-page":
              const partnerPageSection = element;
              partnerPageSection.innerHTML += individualPartnerPage(formattedPartnerName, partnersData);
          }
        }
      });
    }
  };

  // src/routes.ts
  var routeDispatcher = () => {
    var routeDispatcher2 = new RouteDispatcher(Site);
    routeDispatcher2.routes = {
      "/": HomePage,
      "/partner/*": IndividualPartner,
      "/partner": PartnerPage
    };
    return routeDispatcher2;
  };

  // src/engine/component-manager.ts
  var ComponentManager = class {
    constructor() {
      this.components = /* @__PURE__ */ new Map();
    }
    registerComponent(type, component) {
      var _a;
      if (!this.components.has(type)) {
        this.components.set(type, []);
      }
      (_a = this.components.get(type)) == null ? void 0 : _a.push(component);
    }
    getComponentsByType(type) {
      return this.components.get(type) || [];
    }
  };

  // src/components/test.ts
  var TestComponent = class {
    constructor(elem) {
      this.elem = elem;
    }
    setup() {
    }
    exec() {
      const sa5 = window["sa5"];
    }
  };

  // src/index.ts
  var SITE_NAME = "Site";
  window.componentManager = new ComponentManager();
  initSSE();
  var setup = () => {
    console.log(`${SITE_NAME} package init v${VERSION}`);
    routeDispatcher().setupRoute();
  };
  var exec = () => {
    routeDispatcher().execRoute();
    const components = document.querySelectorAll("[sse-component]");
    components.forEach((element) => {
      const componentValue = element.getAttribute("sse-component");
      if (componentValue) {
        switch (componentValue) {
          case "test":
            new TestComponent(element).exec();
            break;
          default:
            console.log("Unknown component:", componentValue);
            break;
        }
      }
    });
  };
  setup();
  if (document.readyState !== "loading") {
    exec();
  } else {
    document.addEventListener("DOMContentLoaded", exec);
  }
})();
/*! js-cookie v3.0.5 | MIT */
//# sourceMappingURL=index.js.map
