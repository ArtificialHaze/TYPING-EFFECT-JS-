const TypeEffect = function (textElement, words, waitTime = 3500) {
  this.textElement = textElement;
  this.words = words;
  this.text = "";
  this.wordIndex = 0;
  this.waitTime = parseInt(waitTime, 10);
  this.type();
  this.isRemoving = false;
};

TypeEffect.prototype.type = function () {
  const currentWord = this.wordIndex % this.words.length;
  const fullText = this.words[currentWord];

  if (this.isRemoving) {
    this.text = fullText.substring(0, this.text.length - 1);
  } else {
    this.text = fullText.substring(0, this.text.length + 1);
  }

  this.textElement.innerHTML = `<span class="text">${this.text}</span>`;

  let typeSpeed = 250;

  if (this.isRemoving) {
    typeSpeed /= 2;
  }

  if (!this.isRemoving && this.text === fullText) {
    typeSpeed = this.waitTime;
    this.isRemoving = true;
  } else if (this.isRemoving && this.text === "") {
    this.isRemoving = false;
    this.wordIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  const textElement = document.querySelector(".text-type");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const waitTime = textElement.getAttribute("data-wait");

  new TypeEffect(textElement, words, waitTime);
}
