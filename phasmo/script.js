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
  <div class="ghost-header">
    <h2>${ghost.name}</h2>
    <button class="view-tells-btn">More Info</button>
  </div>
  <div class="evidence">
    ${ghost.evidence.map(e => `<span class="evidence-item">${e}</span>`).join("")}
  </div>
  <div class="details">
    <div class="stats-inline">
      <div>
        <p><strong>Sanity Threshold:</strong></p>
        <ul class="mini-list">
          ${ghost.sanityThreshold.map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>
      <div>
        <p><strong>Speed:</strong></p>
        <ul class="mini-list">
          ${ghost.speed.map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>
    </div>
  </div>
`;


  // Add click event to open modal
  box.querySelector(".view-tells-btn").addEventListener("click", () => {
    modalTitle.textContent = "Tells";
    modalTells.innerHTML = "<ul>" + ghost.tells.map(t => `<li>${t}</li>`).join("") + "</ul>";
    modal.classList.remove("hidden");
  });

  container.appendChild(box);
});

// Close modal
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});
