
const ditto = {
    id: 132,
    name: "ditto",
    type: "normal",
    abilities: ["limber", "imposter"],
    base_experience: 101,
    height: 3,
    weight: 40,
    stats: {
        hp: 48,
        attack: 48,
        defense: 48,
        special_attack: 48,
        special_defense: 48,
        speed: 48
    },
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
    transform: function () {
        return this.sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png"
    }
};

document.getElementById("name").textContent = ditto.name;
document.getElementById("hp").textContent = ditto.stats.hp;
document.getElementById("ability1").textContent = ditto.abilities[0];
document.getElementById("ability2").textContent = ditto.abilities[1];



const dittoImg = document.getElementById("ditto");
dittoImg.src = ditto.sprite;

dittoImg.addEventListener("click", function () {
    dittoImg.src = ditto.transform();
});

