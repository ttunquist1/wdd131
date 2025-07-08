//Evidences
const EMF_5 = "EMF 5"
const UV = "UV"
const Writing = "Writing"
const Freezing = "Freezing"
const DOTS = "D.O.T.S"
const Orbs = "Orbs"
const Spirit = 'Spirit Box'

// temporary template to use when adding all ghosts to json style
const temp = [
    {
        name: "",
        evidence: [],
        sanityThreshold: [],
        speed: "",
        tells: []
    }
]

const phasmophobiaGhost = [
    {
        name: "Spirit",
        evidence: [EMF_5, Spirit, Writing],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"], //LOS
        tells: ['Waits 180s after incence before attempting to hunt instead of standard 90s']
    },
    {
        name: "Wraith",
        evidence: [EMF_5, Spirit, DOTS],
        sanityThreshold: ["50%"],
        speed: ['1.7 m/s'],//LOS
        tells:["Will not interact with salt at all(will not step in it)", "Tier 3 salt does not affect the wraith"]
    },
    {
        name: "Phantom",
        evidence: [Spirit, DOTS, UV],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"], //los
        tells:["The Physical Ghost model does not appear in photos or videos(shadow and D.O.T.S. do show)", "Taking Photo or Video will cause Ghost to disapear", "Less visible during hunts", "Player Sanity drops '0.5%' /s while player is within heartbeat range of ghost during hunts or events"]
    },
    {
        name: "Poltergeist",
        evidence: [Spirit, UV, Writing],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"],//los
        tells:["Poltergeists throw objects further during hunts every 0.5s"]
    },
    {
        name: "Banshee",
        evidence: [Orbs, UV, DOTS],
        sanityThreshold: ["12%","50%", "87%"],
        speed: ["1.7 m/s"],//los
        tells:["Has 1/3 chance to give a unique scream through parabolic mic or audio recorder", "Hunts are based of targest sanity instead of teams average sanity", "Will only pursue its target during a hunt, (if target is within the map)", "Target loses increased sanity if touched by ghost during singing event(standard is 10%, targets drop is 15%)"]
    },
    {
        name: "Jinn",
        evidence: [EMF_5, UV, Freezing],
        sanityThreshold: ["50%"],
        speed: "1.7 m/s", // 2.5 m/s LOS
        tells:["When breaker is on, the Jinn will speed up during a hunt if it has LOS on player and further than 3m"]
    },
    {
        name: "Mare",
        evidence: [Spirit, Orbs, Writing],
        sanityThreshold: ["40%", "60%"],
        speed: "1.7 m/s", //los
        tells:["Won't hunt until 40% team sanity when light switch in its current room is in the on position(breaker does not need to be on), 60% team sanity if light switch is in off position or if light bulbs are broken"]
    },
    {
        name: "Revenant",
        evidence: [Orbs, Writing, Freezing],
        sanityThreshold: ["50%"],
        speed: "3.0 m/s", //1.0 m/s when doesnt see you. no LOS
        tells: ["During a hunt, the Revenant will be slow (1.0 m/s) until it detects a player(voice, active equipment, or LOS) where is changes speed to 3.0 m/s and runs to last known location of player where it then slows back down. "]
    },
    {
        name: "Shade",
        evidence: [EMF_5, Writing, Freezing],
        sanityThreshold: ["35%"],
        speed: "1.7 m/s", //los
        tells: ["Only ghost that can appear as a shadow during summoning circle, music box, and monkey paw events"]
    },
    {
        name: "Demon",
        evidence: [UV, Writing, Freezing],
        sanityThreshold: ["70%", "100%"],
        speed: "1.7 m/s", //los
        tells: ["Hunts sooner after smudge(60s instead of 90s)", "Ghost can hunt 20s after previous hunt or crucifix burn(standard is 25s)"]
    },
    {
        name: "Yurei",
        evidence: [Orbs, Freezing, DOTS],
        sanityThreshold: ["50%"],
        speed: "1.7 m/s", //los
        tells: ["Incense will force the ghost into favorite room for duration of effect(90s)"]
    },
    {
        name: "Oni",
        evidence: [EMF_5, Freezing, DOTS],
        sanityThreshold: ["50%"],
        speed: "1.7 m/s", //los
        tells: ["Drains 20% sanity during events(standard is 10%)", "Does not give 'ghost mist' event", "Blinks more during events(causes Oni to be more visible"]
    },
    {
        name: "Yokai",
        evidence: [],
        sanityThreshold: [],
        speed: "",
        tells: []
    }
]


export default phasmophobiaGhost;