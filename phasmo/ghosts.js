const phasmophobiaGhost = [
    {
        name: "Spirit",
        evidence: ["EMF Level 5", "Spirit Box", "Ghost Writing"],
        sanityThreshold: "50%",
        strength: "None",
        weakness: "Smudge sticks stop attacks for longer",
        speed: "1.7 m/s",
        abilities: ["Standard ghost behavior with no unique abilities"],
        tells: 'Waits 180s after incence before attempting to hunt instead of standard 90s'
    },
    {
        name: "Wraith",
        evidence: ["EMF Level 5", "Spirit Box", "D.O.T.S Projector"],
        strength: "Can teleport to players",
        weakness: "Fears salt",
        speed: "Normal",
        abilities: ["Does not touch the ground, rarely steps in salt"]
    },
    {
        name: "Phantom",
        evidence: ["Spirit Box", "D.O.T.S Projector", "Fingerprints"],
        strength: "Looking at it reduces your sanity faster",
        weakness: "Taking a photo makes it temporarily disappear",
        speed: "Normal",
        abilities: ["Less visible during hunts"]
    },
    {
        name: "Banshee",
        evidence: ["Ghost Orb", "Fingerprints", "D.O.T.S Projector"],
        strength: "Focuses on one player at a time",
        weakness: "Fears crucifixes more than other ghosts",
        speed: "Normal",
        abilities: ["Can use its scream ability on the parabolic mic"]
    },
    {
        name: "Jinn",
        evidence: ["EMF Level 5", "Fingerprints", "Freezing Temperatures"],
        strength: "Moves faster if its target is far away",
        weakness: "Turning off the power prevents it from using its speed ability",
        speed: "Fast (when ability is active)",
        abilities: ["Disrupts electronics when manifesting"]
    }
]


export default phasmophobiaGhost;