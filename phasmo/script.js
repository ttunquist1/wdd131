import phasmophobiaGhosts from './ghosts.js';

const container = document.getElementById("ghost-container");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalTells = document.getElementById("modal-tells");
const closeBtn = document.querySelector(".close-btn");

phasmophobiaGhosts.forEach(ghost => {
  const box = document.createElement("div");
  box.className = "ghost-box";

  box.innerHTML = `
    <h2>${ghost.name}</h2>
    <div class="evidence">
      ${ghost.evidence.map(e => `<span class="evidence-item">${e}</span>`).join("")}
    </div>
    <div class="details">
      <p><strong>Sanity Threshold:</strong> ${ghost.sanityThreshold}</p>
      <p><strong>Speed:</strong> ${ghost.speed}</p>
    </div>
    <button class="view-tells-btn">Tells</button>
  `;

  // Add click event to open modal
  box.querySelector(".view-tells-btn").addEventListener("click", () => {
    modalTitle.textContent = ghost.name + " - Tells";
    modalTells.textContent = ghost.tells;
    modal.classList.remove("hidden");
  });

  container.appendChild(box);
});

// Close modal
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});
