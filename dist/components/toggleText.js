"use strict";
(() => {
  // src/components/toggleText.ts
  var ToggleText = class {
    constructor(buttonId, textId) {
      this.button = document.getElementById(buttonId);
      this.text = document.getElementById(textId);
      this.button.addEventListener("click", this.toggleTextVisibility.bind(this));
    }
    toggleTextVisibility() {
      if (this.text.style.display === "none") {
        this.text.style.display = "block";
      } else {
        this.text.style.display = "none";
      }
    }
  };
})();
//# sourceMappingURL=toggleText.js.map
