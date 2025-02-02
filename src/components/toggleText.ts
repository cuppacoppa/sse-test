// src/components/toggleText.ts
export class ToggleText {
    private button: HTMLButtonElement;
    private text: HTMLElement;
  
    constructor(buttonId: string, textId: string) {
      this.button = document.getElementById(buttonId) as HTMLButtonElement;
      this.text = document.getElementById(textId) as HTMLElement;
      
      this.button.addEventListener('click', this.toggleTextVisibility.bind(this));
    }
  
    private toggleTextVisibility() {
      if (this.text.style.display === 'none') {
        this.text.style.display = 'block';
      } else {
        this.text.style.display = 'none';
      }
    }
  }
  