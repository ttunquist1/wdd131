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
      <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
        <button class="view-tells-btn">More Info</button>
        <button class="toggle-hide-btn">Hide</button>
      </div>
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

  // Modal behavior
  box.querySelector(".view-tells-btn").addEventListener("click", () => {
    modalTitle.textContent = ghost.name;
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = ""; // Clear previous content

    // Helper function to add a section if it exists
    const addSection = (title, items) => {
      if (Array.isArray(items) && items.length > 0) {
        const section = document.createElement("div");
        section.innerHTML = `
        <h4>${title}</h4>
        <ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>
      `;
        modalBody.appendChild(section);
      }
    };

    addSection("Tells", ghost.tells);
    addSection("Behavior", ghost.behavior);
    addSection("Abilities", ghost.abilities);

    modal.classList.remove("hidden");
  });

  // Manual hide/show toggle
  let isDimmed = false;
  const toggleBtn = box.querySelector(".toggle-hide-btn");
  toggleBtn.addEventListener("click", () => {
    isDimmed = !isDimmed;
    toggleBtn.textContent = isDimmed ? "Show" : "Hide";
    box.classList.toggle("dimmed", isDimmed);
  });

  container.appendChild(box);
  ghostBoxes.push({ ghost, element: box });

});

// Modal close
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Tri-state filtering
const checkboxes = document.querySelectorAll('#filter-menu input[type="checkbox"]');
const evidenceStates = {};

checkboxes.forEach(cb => {
  const value = cb.value;
  evidenceStates[value] = "ignored";

  const label = cb.closest('label');
  label.classList.add('tristate');

  cb.addEventListener('click', (e) => {
    e.preventDefault();

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

// Main filter logic
function filterGhosts() {
  const required = [];
  const excluded = [];

  for (const [evidence, state] of Object.entries(evidenceStates)) {
    if (state === "required") required.push(evidence);
    if (state === "excluded") excluded.push(evidence);
  }

  const sanityValue = document.querySelector('input[name="sanity"]:checked').value;

  ghostBoxes.forEach(({ ghost, element }) => {
    const hasRequired = required.every(ev => ghost.evidence.includes(ev));
    const hasExcluded = excluded.some(ev => ghost.evidence.includes(ev));

    let passesSanity = true;
    if (sanityValue !== "any") {
      const sanityNumbers = ghost.sanityThreshold
        .map(s => parseInt(s.replace(/\D/g, ''))) // Extract numbers like "50" from "50%"
        .filter(n => !isNaN(n));

      if (sanityValue === "under50") {
        passesSanity = sanityNumbers.some(n => n < 50);
      } else if (sanityValue === "50") {
        passesSanity = sanityNumbers.some(n => n === 50);
      } else if (sanityValue === "over50") {
        passesSanity = sanityNumbers.some(n => n > 50);
      }
    }

    const show = (required.length === 0 || hasRequired) && !hasExcluded && passesSanity;
    element.style.display = show ? "block" : "none";
  });
}


// Sanity filter radio buttons
document.querySelectorAll('input[name="sanity"]').forEach(rb => {
  rb.addEventListener("change", filterGhosts);
});