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
        speed: [],
        tells: [],
        behaviors:[],
        abilities:[],
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
        tells:["Will not interact with salt at all(will not step in it)", "Tier 3 salt does not affect the wraith"],
        abilities: ["Can telepory to a random player, leaving EMF2 or EMF5 at the location they teleported to."]
    },
    {
        name: "Phantom",
        evidence: [Spirit, DOTS, UV],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"], //los
        tells:["The Physical Ghost model does not appear in photos or videos(shadow and D.O.T.S. do show)", "Taking Photo or Video will cause Ghost to disapear", "Less visible during hunts", "Player Sanity drops '0.5%' /s while player is within heartbeat range of ghost during hunts or events"],
        abilities:["Can roam toward a random player, leaving EMF2 at the location they wandered to."]
    },
    {
        name: "Poltergeist",
        evidence: [Spirit, UV, Writing],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"],//los
        tells:["Poltergeists throw objects further during hunts every 0.5s"],
        behaviors:['Has a higher chance to throw and interacts with objects','Can throw  objects further and faster'],
        abilities:['Poltergeist Explostion!! Interacts with multiple items near by at the same time and throughs them all at the same time, like an explosion.']
    },
    {
        name: "Banshee",
        evidence: [Orbs, UV, DOTS],
        sanityThreshold: ["12%","50%", "87%"],
        speed: ["1.7 m/s"],//los
        tells:["Has 1/3 chance to give a unique scream through parabolic mic or audio recorder", "Hunts are based of targest sanity instead of teams average sanity", "Will only pursue its target during a hunt, (if target is within the map)", "Target loses increased sanity if touched by ghost during singing event(standard is 10%, targets drop is 15%)"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Jinn",
        evidence: [EMF_5, UV, Freezing],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s", "2.5 m/s"], //LOS
        tells:["When breaker is on, the Jinn will speed up during a hunt if it has LOS on player and further than 3m"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Mare",
        evidence: [Spirit, Orbs, Writing],
        sanityThreshold: ["40%", "60%"],
        speed: ["1.7 m/s"], //los
        tells:["Won't hunt until 40% team sanity when light switch in its current room is in the on position(breaker does not need to be on), 60% team sanity if light switch is in off position or if light bulbs are broken"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Revenant",
        evidence: [Orbs, Writing, Freezing],
        sanityThreshold: ["50%"],
        speed: ["1.0 m/s","3.0 m/s"], // no LOS
        tells: ["During a hunt, the Revenant will be slow (1.0 m/s) until it detects a player(voice, active equipment, or LOS) where is changes speed to 3.0 m/s and runs to last known location of player where it then slows back down. "],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Shade",
        evidence: [EMF_5, Writing, Freezing],
        sanityThreshold: ["35%"],
        speed: ["1.7 m/s"], //los
        tells: ["Only ghost that can appear as a shadow during summoning circle, music box, and monkey paw events"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Demon",
        evidence: [UV, Writing, Freezing],
        sanityThreshold: ["70%", "100%"],
        speed: ["1.7 m/s"], //los
        tells: ["Hunts sooner after smudge(60s instead of 90s)", "Ghost can hunt 20s after previous hunt or crucifix burn(standard is 25s)"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Yurei",
        evidence: [Orbs, Freezing, DOTS],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"], //los
        tells: ["Incense will force the ghost into favorite room for duration of effect(90s)"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Oni",
        evidence: [EMF_5, Freezing, DOTS],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"], //los
        tells: ["Drains 20% sanity during events(standard is 10%)", "Does not give 'ghost mist' event", "Blinks more during events(causes Oni to be more visible"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Yokai",
        evidence: [Spirit, Orbs, DOTS],
        sanityThreshold: ["50%", "80%"],
        speed: ["1.7 m/s"], //los
        tells: ["Hearing and detection has shorter distand and less during a hunt(2.5m)"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Hantu",
        evidence: [UV, Orbs, Freezing],
        sanityThreshold: ["50%"],
        speed: ["1.4 m/s", "2.7 m/s"], // no los
        tells: ["Will have visible breath during hunts when breaker is broken/off", "Cannot turn on the breaker", "Faster un colder rooms", "Likes to turn off the breaker"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Goryo",
        evidence: [EMF_5, UV, DOTS],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"], //los
        tells: ["DOTS only appear on video camera, and will not appear if player is in room."],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Myling",
        evidence: [EMF_5, UV, Writing],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"], //los
        tells: ["Footsteps and vocals cannot be heard from more than 12m away during hunt.(standard is 20m)", "Makes sounds on Parabolic mic and sound recorder more often than other ghosts"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Onryo",
        evidence: [Spirit, Orbs, Freezing],
        sanityThreshold: ["40%", "60%", "100%"],
        speed: ["1.7 m/s"], //los
        tells: ["Cannot ignite a fire source", "Will attempt to hunt player at any average sanity after extinguishing every 3rd light"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "The Twins",
        evidence: [EMF_5, Spirit, Freezing],
        sanityThreshold: ["50%"],
        speed: ["1.53 m/s", "1.87 m/s"], // los
        tells: ["Can do 2 interactions at the same time(one in normal distance(2.12m and 4.24m on large maps) and one at extended distance(8.48m and 16.97m on large maps))", "Ghosts speed will vary +-10% during hunts(does not change during hunt (beyond LOS change))"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Raiju",
        evidence: [EMF_5, UV, DOTS],
        sanityThreshold: ["50%", "65%"],
        speed: ["1.7 m/s", "2.5 m/s"], // los
        tells: [],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Obake",
        evidence: [EMF_5, UV, Orbs],
        sanityThreshold: ["50%"],
        speed: ["1.7 m/s"], //los
        tells: ["Has a special 6 fingered hand print","Has a 1/4 chance to not leave UV", "Changes model at least one time for a single blink each hunt"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "The Mimic",
        evidence: [Spirit, UV, Freezing, Orbs],
        sanityThreshold: ["12%", "50%", "100%"],
        speed: ["1.7m m/s"], //los
        tells: ["Always  shows Ghost Orbs(even if 0 evidence is selected)"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Moroi",
        evidence: [Spirit, Writing, Freezing],
        sanityThreshold: ["50%"],
        speed: ["1.5 m/s", "2.25 m/s", "3.71 m/s"],
        tells: ["Places a curse on the player when heard through Sprit Box, Sound Recorder, and Parabolic Mic(This curse causes sanity to deain twice as fast, even when in lit room(like the van))", "Blinded by Incense longer during hunt(standard is 5s, Moroi is 7s)"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Deogen",
        evidence: [Spirit, Writing, DOTS],
        sanityThreshold: ["40%"],
        speed: ["0.4 m/s", "3.0 m/s"],
        tells: ["CANNOT HIDE FROM THIS GHOST(ALWAYS KNOWS WHERE YOU ARE)", "The Deogen is super fast but slows to a crawl when it gets near you, easy to loop around a table for the duration of hunt so you do not die","Has 1/3 chance to give heavy breathing on spiritbox when within 1m of ghost","Super visible during hunt"],
        behaviors:[],
        abilities:[],
    },
    {
        name: "Thaye",
        evidence: [Orbs, Writing, DOTS],
        sanityThreshold: ["15%", "75%"],
        speed: ["1.0 m/s", "2.75 m/s"],
        tells: ["The Ouija board age response increases as the Thaye ages"],
        behaviors:[],
        abilities:[],
    }


    
    
]


export default phasmophobiaGhost;