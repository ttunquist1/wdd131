import phasmophobiaGhosts from './ghosts.js';

const container = document.getElementById("ghost-container");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalTells = document.getElementById("modal-tells");
const closeBtn = document.querySelector(".close-btn");

const ghostBoxes = [];

// Generate ghost cards
phasmophobiaGhosts.forEach(ghost => {
  const box = document.createElement("div");
  box.className = "ghost-box";

  box.innerHTML = `
    <div class="top-row" style="display: flex; justify-content: space-between; align-items: center;">
      <h2>${ghost.name}</h2>
      <button class="view-tells-btn">More Info</button>
    </div>
    <div class="evidence">
      ${ghost.evidence.map(e => `<span class="evidence-item">${e}</span>`).join("")}
    </div>
    <div class="details">
      <div class="stats-inline" style="display: flex; gap: 20px;">
        <div class="stat-block">
          <p><strong>Sanity:</strong></p>
          <ul class="mini-list">${ghost.sanityThreshold.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div class="stat-block">
          <p><strong>Speed:</strong></p>
          <ul class="mini-list">${ghost.speed.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
  `;

  box.querySelector(".view-tells-btn").addEventListener("click", () => {
    modalTitle.textContent = ghost.name + " - Tells";
    modalTells.innerHTML = "<ul>" + ghost.tells.map(t => `<li>${t}</li>`).join("") + "</ul>";
    modal.classList.remove("hidden");
  });

  container.appendChild(box);
  ghostBoxes.push({ ghost, element: box });
});

// Modal behavior
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Filtering logic
const checkboxes = document.querySelectorAll('#filter-menu input[type="checkbox"]');

checkboxes.forEach(cb => cb.addEventListener('change', filterGhosts));

function filterGhosts() {
  const selected = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  ghostBoxes.forEach(({ ghost, element }) => {
    const hasAllEvidence = selected.every(e => ghost.evidence.includes(e));
    const show = selected.length === 0 || hasAllEvidence;
    element.style.display = show ? "block" : "none";
  });
}
