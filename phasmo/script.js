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

const evidenceStates = {}; // Tracks tri-state for each evidence

checkboxes.forEach(cb => {
  const value = cb.value;
  evidenceStates[value] = "ignored"; // default state

  // Use label to show state styling
  const label = cb.closest('label');
  label.classList.add('tristate');

  cb.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default checkbox behavior

    // Cycle state
    if (evidenceStates[value] === "ignored") {
      evidenceStates[value] = "required";
      label.classList.remove("excluded");
      label.classList.add("required");
      cb.checked = true;
    } else if (evidenceStates[value] === "required") {
      evidenceStates[value] = "excluded";
      label.classList.remove("required");
      label.classList.add("excluded");
      cb.checked = false;
    } else {
      evidenceStates[value] = "ignored";
      label.classList.remove("required", "excluded");
      cb.checked = false;
    }

    filterGhosts();
  });
});

function filterGhosts() {
  const required = [];
  const excluded = [];

  for (const [evidence, state] of Object.entries(evidenceStates)) {
    if (state === "required") required.push(evidence);
    if (state === "excluded") excluded.push(evidence);
  }

  ghostBoxes.forEach(({ ghost, element }) => {
    const hasRequired = required.every(ev => ghost.evidence.includes(ev));
    const hasExcluded = excluded.some(ev => ghost.evidence.includes(ev));

    const show = (required.length === 0 || hasRequired) && !hasExcluded;
    element.style.display = show ? "block" : "none";
  });
}

