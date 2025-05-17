// menu
const menuButton = document.querySelector(".medium");

function toggleMenu() {
  const menu = document.querySelector(".nav-list");
  menu.classList.toggle("show");
  console.log("Menu toggled");
}

menuButton.addEventListener("click", toggleMenu);


// modal
// Create the modal
const modal = document.createElement('dialog');
modal.innerHTML = `<img><button class='close-viewer' aria-label="Close viewer">X</button>`;
document.body.appendChild(modal);

// Wait until it's added to the DOM, then get the elements inside it
const modalImage = modal.querySelector('img');
let closeButton = modal.querySelector('.close-viewer');

// Add event listener to all gallery images
const galleryImages = document.querySelectorAll('.image-container1 img');

galleryImages.forEach(img => {
  img.addEventListener('click', (event) => {
    const clickedImg = event.target;
    const src = clickedImg.getAttribute('src');
    const alt = clickedImg.getAttribute('alt');

    const baseName = src.split('-')[0]; // e.g. "norris"
    const fullSrc = baseName + '-full.jpeg'; // e.g. "norris-full.jpeg"

    modalImage.src = fullSrc;
    modalImage.alt = alt;

    modal.showModal();
  });
});

// Close modal on button click
modal.addEventListener('click', (event) => {
  // If the actual modal backdrop was clicked, close it
  if (event.target === modal) {
    modal.close();
  }
});

// ✅ Fix: Add the event listener after modal is added to the DOM
modal.addEventListener('click', (event) => {
  if (event.target.classList.contains('close-viewer')) {
    modal.close();
  }
});
