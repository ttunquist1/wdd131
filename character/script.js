const character = {
  name: "Snortleblat",
  class: "Swamp Beast Diplomat",
  level: 5,
  health: 100,
  image: 'https://andejuli.github.io/wdd131/character_card/snortleblat.webp',
  attacked() {
    if (this.health >= 20) {
      this.health -= 20;
    } else {
      alert('Character Died');
    }
  },
  levelUp() {
    this.level += 1;
    this.health += 20;
  }
};

function updateUI() {
  document.querySelector('.image').src = character.image;
  document.querySelector('.image').alt = character.name;
  document.querySelector('.name').textContent = character.name;
  document.getElementById('class').textContent = character.class;
  document.getElementById('level').textContent = character.level;
  document.getElementById('health').textContent = character.health;
}

document.getElementById('attacked').addEventListener('click', () => {
  character.attacked();
  updateUI();
  document.getElementById('log').textContent = `${character.name} was attacked!`;
});

document.getElementById('levelup').addEventListener('click', () => {
  character.levelUp();
  updateUI();
  document.getElementById('log').textContent = `${character.name} leveled up!`;
});

window.addEventListener('DOMContentLoaded', updateUI);
