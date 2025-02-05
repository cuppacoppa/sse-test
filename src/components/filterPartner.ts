export const partnerFilter = () => {
    return `
      <div class="filter-container">
        <button class="filter-button">Filter</button>
        <div class="filter-dropdown">
          <label for="partner-type">Partner Type</label>
          <select id="partner-type">
            <option value="">Select Type</option>
            <option value="main">Main Partner</option>
            <option value="application">Application Partner</option>
          </select>
        </div>
      </div>
    `;
  };
  
  window.addEventListener("load", () => {
    const filterComponent = document.querySelector('[sse-component="partner-filter"]');
    if (filterComponent) {
      filterComponent.innerHTML = partnerFilter();
      
      const button = filterComponent.querySelector(".filter-button") as HTMLButtonElement;
      const dropdown = filterComponent.querySelector(".filter-dropdown") as HTMLDivElement;
      
      button.addEventListener("click", () => {
        dropdown.classList.toggle("open");
        console.log('hi');
      });
    }
  });
  