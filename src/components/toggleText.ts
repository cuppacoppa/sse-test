// src/components/toggleText.ts
export class ToggleText {
    private button: HTMLButtonElement;
    private text: HTMLElement;
  
    constructor(buttonId: string, textId: string) {
      this.button = document.getElementById(buttonId) as HTMLButtonElement;
      this.text = document.getElementById(textId) as HTMLElement;
      
      // Log the initial state of the text
      console.log(`Initial text visibility: ${this.text.style.display}`);
  
      this.button.addEventListener('click', this.toggleTextVisibility.bind(this));
    }
  
    private toggleTextVisibility() {
      // Toggle the display state
      if (this.text.style.display === 'none') {
        this.text.style.display = 'block';
        console.log('Text is now visible');
      } else {
        this.text.style.display = 'none';
        console.log('Text is now hidden');
      }
  
      // Log the current state after the toggle
      console.log(`Current text visibility: ${this.text.style.display}`);
    }
  }
  