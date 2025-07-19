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

  const selectedEvidences = Array.from(allEvidenceButtons)
    .filter(btn => btn.classList.contains("required"))
    .map(btn => btn.textContent.trim());

  // Special case: evidence limit is 0 and "Orbs" is selected
  if (evidenceLimit === 0) {
    document.querySelectorAll(".ghost-box").forEach(box => {
      const name = box.querySelector("h2").textContent;
      if (selectedEvidences.includes("Orbs") && name === "Mimic") {
        box.classList.remove("dimmed");
      } else {
        box.classList.add("dimmed");
      }
    });
    return;
  }

  for (const [evidence, state] of Object.entries(evidenceStates)) {
    if (state === "required") required.push(evidence);
    if (state === "excluded") excluded.push(evidence);
  }

  const sanityValue = document.querySelector('input[name="sanity"]:checked').value;
  const speedValue = document.querySelector('input[name="speed"]:checked').value;

  ghostBoxes.forEach(({ ghost, element }) => {
    const hasRequired = required.every(ev => ghost.evidence.includes(ev));
    const hasExcluded = excluded.some(ev => ghost.evidence.includes(ev));

    // Sanity check
    let passesSanity = true;
    if (sanityValue !== "any") {
      const thresholds = ghost.sanityThreshold
        .map(s => parseFloat(s.replace(/[^0-9]/g, '')))
        .filter(n => !isNaN(n));

      if (thresholds.length === 0) {
        passesSanity = false;
      } else {
        if (sanityValue === "under") {
          passesSanity = thresholds.some(n => n < 50);
        } else if (sanityValue === "exact") {
          passesSanity = thresholds.some(n => n === 50);
        } else if (sanityValue === "over") {
          passesSanity = thresholds.some(n => n > 50);
        }
      }
    }

    // Speed check
    let passesSpeed = true;
    if (speedValue !== "any") {
      const speeds = ghost.speed
        .map(s => parseFloat(s.replace(/[^0-9.]/g, '')))
        .filter(n => !isNaN(n));

      if (speeds.length === 0) {
        passesSpeed = false;
      } else {
        if (speedValue === "under") {
          passesSpeed = speeds.some(n => n < 1.7);
        } else if (speedValue === "exact") {
          passesSpeed = speeds.some(n => n === 1.7);
        } else if (speedValue === "over") {
          passesSpeed = speeds.some(n => n > 1.7);
        }
      }
    }

    const show = (required.length === 0 || hasRequired) && !hasExcluded && passesSanity && passesSpeed;
    element.style.display = show ? "block" : "none";
  });
}

const evidenceLimitSelect = document.getElementById("evidence-limit");
let evidenceLimit = parseInt(evidenceLimitSelect.value);
const allEvidenceButtons = document.querySelectorAll(".tristate");

evidenceLimitSelect.addEventListener("change", () => {
  evidenceLimit = parseInt(evidenceLimitSelect.value);
  enforceEvidenceLimit();
});

function getSelectedEvidenceCount() {
  return Array.from(allEvidenceButtons).filter(btn => {
    return btn.classList.contains("required") && btn.textContent.trim() !== "Orbs";
  }).length;
}

function enforceEvidenceLimit() {
  const selectedCount = getSelectedEvidenceCount();

  allEvidenceButtons.forEach(btn => {
    const evidenceName = btn.textContent.trim();
    const isRequired = btn.classList.contains("required");

    if (evidenceLimit === 0) {
      // Only allow "Orbs", disable all others
      if (evidenceName === "Orbs") {
        btn.disabled = false;
        btn.classList.remove("disabled");
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
      } else {
        btn.disabled = true;
        btn.classList.remove("required", "excluded");
        btn.setAttribute("data-state", "none");
        btn.classList.add("disabled");
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.3";
      }
    } else {
      // Enable all (with limit logic), including Orbs
      btn.disabled = false;
      btn.classList.remove("disabled");

      if (evidenceName === "Orbs") {
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
        return;
      }

      if (!isRequired && selectedCount >= evidenceLimit) {
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.4";
      } else {
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
      }
    }
  });
}



// Run once on load
enforceEvidenceLimit();

// Hook into your existing tri-state toggle logic
document.querySelectorAll(".tristate").forEach(btn => {
  btn.addEventListener("click", () => {
    const currentState = btn.getAttribute("data-state") || "none";
    let nextState;
    if (currentState === "none") nextState = "excluded";
    else if (currentState === "excluded") nextState = "required";
    else nextState = "none";

    btn.setAttribute("data-state", nextState);
    btn.classList.remove("required", "excluded");
    if (nextState !== "none") btn.classList.add(nextState);

    enforceEvidenceLimit();
    filterGhosts(); // Keep your filter logic updated
  });
});



document.querySelectorAll('input[name="sanity"]').forEach(rb => {
  rb.addEventListener("change", filterGhosts);
});

document.querySelectorAll('input[name="speed"]').forEach(rb => {
  rb.addEventListener("change", filterGhosts);
});

document.getElementById("random-ghost-btn").addEventListener("click", () => {
  // Select only visible (non-dimmed) ghost boxes
  const visibleGhosts = Array.from(document.querySelectorAll(".ghost-box"))
    .filter(ghost => !ghost.classList.contains("dimmed"));

  if (visibleGhosts.length === 0) {
    alert("No ghosts match the current filters!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * visibleGhosts.length);
  const selectedGhost = visibleGhosts[randomIndex];

  // Optional: highlight
  visibleGhosts.forEach(g => g.classList.remove("highlighted-ghost"));
  selectedGhost.classList.add("highlighted-ghost");
});

