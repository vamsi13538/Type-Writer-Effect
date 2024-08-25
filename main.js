// Creating typer writer effect using ES6 Class

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Get current index of word
        const current = this.wordIndex % this.words.length;
        // Get fulltxt of word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into html
        this.txtElement.innerHTML = `<span class="text">${this.txt}</span>`

        // Initiial type speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            this.typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            // Set delet to false
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }


        setTimeout(() => this.type(), typeSpeed);
    }
}

// AddEventListener after dom loading;
document.addEventListener('DOMContentLoaded', init);

// Function Init
function init() {
    // Get elements and attributes in html
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}