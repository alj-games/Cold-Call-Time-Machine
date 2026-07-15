import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   COLD CALL TIME MACHINE
   ───────────────────────────────────────────────────────────────────
   ★ EDIT YOUR FACTS HERE ★
   Each fact needs: year (number), title (short), text (the fun bit).
   Add, remove or reword entries freely — keep the { } and commas.
   Facts can be ANY year; the path will glow wherever you put them.
   ═══════════════════════════════════════════════════════════════════ */
const FACTS = [
  { year: 2, title: "Everyone, line up!", text: "Han China completes one of the earliest surviving censuses: 57,671,400 people, counted by hand. Imagine cold calling that list." },
  { year: 6, title: "Rome gets a fire brigade", text: "Augustus founds the Vigiles: 7,000 night-watchmen with buckets, hooks and blankets, patrolling for fires and burglars alike. The world's first city fire service." },
  { year: 9, title: "Rome's worst day at the office", text: "Three entire Roman legions are ambushed in the Teutoburg Forest. Emperor Augustus reportedly banged his head on the wall for months crying 'Varus, give me back my legions!'" },
  { year: 14, title: "Exit stage left", text: "Augustus, Rome's first emperor, dies — allegedly asking 'Have I played my part well? Then applaud as I exit.' The month of August still carries his name." },
  { year: 17, title: "Disaster relief, invented", text: "An earthquake levels twelve cities in Asia Minor overnight. Emperor Tiberius sends rebuilding funds and cancels their taxes for five years — and gets thank-you statues in return." },
  { year: 25, title: "Recipe unlocked: Roman cheesecake", text: "Around now lives Apicius, Rome's most famous foodie. Try ancient libum: mash 100g ricotta with 50g flour and 1 egg, bake on a bay leaf for 35 minutes, then drown it in honey." },
  { year: 33, title: "The first credit crunch", text: "Rome suffers a full-blown financial crisis: land prices crash and lenders panic. Tiberius bails out the banks with 100 million sesterces of interest-free loans. Sound familiar?" },
  { year: 39, title: "A horse in the senate?", text: "Caligula lavishes his racehorse Incitatus with a marble stable and an ivory manger — and, ancient gossips swear, plans to make him consul of Rome." },
  { year: 40, title: "The Trung sisters ride", text: "In Vietnam, sisters Trung Trac and Trung Nhi raise a rebellion against Han rule — leading their armies, by tradition, from the backs of war elephants." },
  { year: 41, title: "Found behind the curtain", text: "Assassins kill Caligula. A soldier finds his bookish uncle Claudius hiding behind a palace curtain — and the Praetorian Guard proclaims the trembling scholar emperor on the spot." },
  { year: 43, title: "Britain meets elephants", text: "Emperor Claudius invades Britain and, to make an entrance, brings war elephants across the Channel. The locals had never seen anything like it." },
  { year: 46, title: "Celebrity biographer born", text: "Around now Plutarch is born. His 'Parallel Lives' profiles of famous Greeks and Romans get borrowed so heavily by Shakespeare that some scenes are nearly word for word." },
  { year: 50, title: "A muddy little outpost", text: "Around now the Romans found Londinium, a small trading post on the Thames. Population: a few thousand. It will eventually take off, slightly." },
  { year: 54, title: "Careful with the mushrooms", text: "Emperor Claudius dies after a plate of mushrooms — allegedly seasoned by his wife Agrippina, whose son Nero very conveniently takes the throne." },
  { year: 59, title: "Banned for hooliganism", text: "Rival fans riot at a gladiator show in Pompeii's amphitheatre. Rome's punishment: Pompeii is banned from hosting games for ten years — history's first stadium ban." },
  { year: 61, title: "Boudica burns it all", text: "Queen Boudica of the Iceni revolts and torches Londinium, Colchester and St Albans. A layer of red scorched earth from her fires still lies beneath London today." },
  { year: 62, title: "Recipe unlocked: the emperor's ice", text: "Nero allegedly sends runners into the mountains to fetch fresh snow, served flavoured with honey and fruit — proto ice cream. Recreate it: crushed ice, a drizzle of honey, smashed berries." },
  { year: 64, title: "Rome on fire", text: "The Great Fire of Rome burns for six days. Did Nero 'fiddle while Rome burned'? Impossible — the fiddle wouldn't be invented for another 1,500 years." },
  { year: 66, title: "A visitor in the sky", text: "Halley's Comet blazes overhead, dutifully recorded by Chinese astronomers. It will return roughly 25 more times before anyone reads this on a phone." },
  { year: 69, title: "Four emperors, one year", text: "Rome burns through Galba, Otho, Vitellius and Vespasian in a single chaotic year. Vespasian wins — and later taxes public urinals, giving us the phrase 'money doesn't stink.'" },
  { year: 77, title: "20,000 facts, some true", text: "Pliny the Elder publishes his Natural History: 37 volumes covering everything from bees to gemstones — plus dog-headed men and elephants that worship the moon." },
  { year: 79, title: "The loaf that survived", text: "Vesuvius buries Pompeii in ash. Among the finds centuries later: a loaf of bread baked that very morning, carbonised whole and stamped with its baker's name." },
  { year: 80, title: "Grand opening", text: "The Colosseum opens with 100 days of games — it could even be flooded for mock naval battles. 50,000 seats, free entry, free snacks." },
  { year: 84, title: "Rome's furthest north", text: "Roman legions defeat the Caledonians deep in the Scottish Highlands — the empire's northernmost battle — then, after surveying the weather, quietly head back south." },
  { year: 92, title: "Mirror, mirror, on every wall", text: "The paranoid emperor Domitian lines his palace walkways with polished moonstone so he can see anyone creeping up behind him. It works for four more years." },
  { year: 96, title: "Rome's best run of bosses", text: "Nerva takes the throne, beginning the 'Five Good Emperors' — 84 years where each ruler is chosen on merit and adopted. One historian called it humanity's happiest era." },
  { year: 97, title: "So close to Rome", text: "Chinese envoy Gan Ying sets out to reach Rome but turns back at the Persian Gulf after sailors spin terrifying tales about the voyage. The two great empires never officially meet." },
  { year: 100, title: "You're invited", text: "At a fort in northern Britain, Claudia Severa writes a birthday party invitation to her friend Lepidina — one of the oldest surviving pieces of Latin writing by a woman." },
  { year: 105, title: "Paper, invented", text: "Cai Lun perfects papermaking in China using tree bark, rags and old fishing nets. Every sticky note on your desk descends from this moment." },
  { year: 106, title: "Gold rush", text: "Trajan conquers Dacia and hauls home a legendary hoard of gold and silver — enough to fund 123 consecutive days of games, plus a rather famous column." },
  { year: 110, title: "Reply-all with the emperor", text: "Governor Pliny the Younger writes to Emperor Trajan about everything: aqueducts, sewage, whether his town may start a fire brigade. Trajan: request denied — clubs cause trouble." },
  { year: 113, title: "A 38-metre comic strip", text: "Trajan's Column rises in Rome: 2,662 carved figures spiralling 23 times around the shaft, telling a complete war story in pictures. Still standing today." },
  { year: 117, title: "Peak Rome", text: "Under Trajan, the empire hits maximum size: five million square kilometres, stretching from Scottish drizzle to the Persian Gulf." },
  { year: 122, title: "The Wall goes up", text: "Hadrian's Wall begins: 73 miles coast to coast. Soldiers from sunny Syria get posted there and write letters home. You can guess the main complaint." },
  { year: 126, title: "The unbeatable dome", text: "The Pantheon is completed in Rome. Nineteen centuries later, its concrete dome is STILL the largest unreinforced dome ever built — and we've lost the concrete recipe." },
  { year: 128, title: "The backpacker emperor", text: "Hadrian spends over half his reign travelling the empire — inspecting forts, climbing Mount Etna to watch the sunrise, writing poetry. Ruling from the road." },
  { year: 132, title: "The earthquake toad machine", text: "Zhang Heng builds the world's first seismoscope: a bronze urn where dragons drop balls into toads' mouths to reveal the direction of earthquakes hundreds of miles away." },
  { year: 138, title: "Farewell, little soul", text: "Dying, Hadrian writes a five-line poem to his own soul: 'animula vagula blandula' — 'little wandering, charming soul...' Emperors: secretly soft." },
  { year: 142, title: "The sequel wall", text: "Rome builds a SECOND wall — the Antonine Wall, 160 km beyond Hadrian's, in Scotland. Twenty years later they abandon it and retreat. Scotland 2, Rome 0." },
  { year: 150, title: "Mapping the world", text: "Ptolemy publishes his Geography, mapping the known world. He undersizes the Earth — an error that, 1,300 years later, convinces Columbus the trip west looks easy." },
  { year: 157, title: "Doctor of gladiators", text: "Young Galen — soon to be antiquity's most famous physician — takes his first job patching up gladiators, calling their wounds 'windows into the body.'" },
  { year: 161, title: "Two emperors, no drama", text: "Marcus Aurelius insists on sharing the throne with his adoptive brother Lucius Verus — Rome's first co-emperors. Against everyone's expectations, they get along." },
  { year: 165, title: "The empire catches something", text: "The Antonine Plague travels home along the trade routes with Roman soldiers — an early lesson that great connectivity ships more than goods." },
  { year: 166, title: "Rome calling China", text: "Travellers claiming to represent Rome finally reach the Han court — the first recorded direct contact between the two superpowers at opposite ends of the Silk Road." },
  { year: 174, title: "The rain miracle", text: "A Roman legion, surrounded and dying of thirst, is saved when a sudden thunderstorm breaks over them mid-battle. Both sides immediately claim their own gods sent it." },
  { year: 180, title: "Notes to self", text: "Marcus Aurelius dies on campaign. His private journal of pep talks to himself — never meant for publication — becomes 'Meditations', still a bestseller 1,800 years later." },
  { year: 184, title: "The Yellow Turbans", text: "Across China, peasants in yellow headscarves rise against the Han dynasty. The rebellion fails, but the dynasty never recovers — setting the stage for the Three Kingdoms." },
  { year: 192, title: "Don't cross your trainer", text: "Emperor Commodus, who fought in the arena as a gladiator, is assassinated — strangled in his bath by his own wrestling coach, Narcissus." },
  { year: 193, title: "Empire for sale, one careful owner", text: "The Praetorian Guard murders the emperor, then literally AUCTIONS the empire from the barracks walls. Winning bidder Didius Julianus lasts 66 days." },
  { year: 200, title: "Rome's ketchup", text: "Garum — fermented fish sauce — sits on every Roman table, brewed in vast coastal factories. Archaeologists report that some buried jars still smell." },
  { year: 211, title: "Deathbed advice", text: "Emperor Septimius Severus dies in York. His final advice to his sons: 'Get along, pay the soldiers, and ignore everyone else.' They manage one out of three." },
  { year: 212, title: "Citizens, all of you", text: "Emperor Caracalla declares nearly every free person in the empire a Roman citizen overnight — tens of millions of people. Mostly, historians suspect, so he could tax them." },
  { year: 216, title: "The world's fanciest gym", text: "The Baths of Caracalla open: room for 1,600 bathers, plus libraries, gardens, gyms and snack sellers. Entry costs about the same as a cup of wine." },
  { year: 220, title: "Three kingdoms", text: "China's mighty Han dynasty falls, splintering into the warring states of Wei, Shu and Wu — the era behind 'Romance of the Three Kingdoms' and a thousand video games." },
  { year: 224, title: "A new Persia rises", text: "Ardashir I overthrows the Parthians and founds the Sassanid Empire — which will be Rome's most sophisticated rival for the next four hundred years." },
  { year: 235, title: "The giant emperor", text: "Maximinus Thrax seizes the throne: an ex-shepherd ancient writers claim stood over eight feet tall. He rules for three years without once setting foot in Rome." },
  { year: 238, title: "Six emperors, one year", text: "Rome speedruns SIX emperors in twelve months: Maximinus, Gordian I, Gordian II, Pupienus, Balbinus and Gordian III. Imperial job security hits an all-time low." },
  { year: 244, title: "Right place, right time", text: "Philip the Arab, born near Damascus, becomes emperor — just in time to host Rome's once-in-a-millennium 1,000th birthday party four years later." },
  { year: 248, title: "Happy 1,000th, Rome", text: "Rome throws itself a millennium birthday bash: three days and nights of games starring elephants, giraffes and tigers." },
  { year: 250, title: "Money grows on trees", text: "In the booming Maya world, cacao beans work as actual currency — and counterfeiters fill empty shells with mud. Yes, people forged chocolate." },
  { year: 260, title: "Worst. Retirement. Ever.", text: "Emperor Valerian is captured in battle by Persia — the only Roman emperor ever taken prisoner. Legend says the Persian king used him as a footstool for mounting his horse." },
  { year: 262, title: "A Wonder falls", text: "Gothic raiders burn the Temple of Artemis at Ephesus — one of the Seven Wonders of the Ancient World, four times the footprint of the Parthenon." },
  { year: 266, title: "China, reunited (briefly)", text: "The Jin dynasty rises from the ashes of the Three Kingdoms and will shortly reunify China — for about thirty years. Easy come, easy go." },
  { year: 271, title: "Build the walls", text: "Emperor Aurelian rings Rome with massive new defensive walls. You can still walk past them today — 19 kilometres of third-century brick." },
  { year: 274, title: "The unconquered sun", text: "Emperor Aurelian establishes a festival of Sol Invictus, the Unconquered Sun, celebrated on the 25th of December. That date has quite a future ahead of it." },
  { year: 282, title: "Death by gardening", text: "Emperor Probus keeps idle soldiers busy planting vineyards and draining swamps. The troops, furious at the chores, mutiny. Lesson: never assign legions yard work." },
  { year: 285, title: "One empire, two desks", text: "Diocletian decides the empire is too big for one inbox and splits it into East and West, each with its own emperor. Delegation, imperial style." },
  { year: 286, title: "Brexit, the prequel", text: "Admiral Carausius seizes Britain and declares his own breakaway Roman Empire, minting coins with his face on for nearly a decade before Rome takes it back." },
  { year: 293, title: "The four-boss system", text: "Diocletian splits power among FOUR co-emperors — the Tetrarchy. Official statues carve all four identical, so nobody looks more important than anyone else." },
  { year: 301, title: "Price caps backfire", text: "Diocletian fixes maximum prices for everything from beer to lions. Markets promptly go underground and the law quietly dies. Economists still cite it as a warning." },
  { year: 305, title: "If you could see my cabbages", text: "Diocletian does the unthinkable: he retires voluntarily. Begged to return to power, he refuses — saying that if they could see the cabbages he'd grown, they'd stop asking." },
  { year: 312, title: "Sign in the sky", text: "Constantine wins the Battle of the Milvian Bridge after reportedly seeing a vision in the sky. Within 25 years the empire has a new favoured religion and a brand-new capital." },
  { year: 315, title: "Ancient upcycling", text: "The Arch of Constantine goes up in Rome — partly built from sculptures pried off older monuments. Why carve new art when the previous century left perfectly good stuff?" },
  { year: 320, title: "India's golden age begins", text: "Chandragupta I founds the Gupta Empire. Over the next two centuries its scholars help give the world the decimal system, early chess — and the zero." },
  { year: 325, title: "The big meeting", text: "Bishops from across the known world gather at Nicaea for history's most famous committee meeting — which, among bigger matters, fixes how the date of Easter is calculated." },
  { year: 330, title: "New Rome", text: "Constantinople is founded on the Bosphorus — the 'Queen of Cities'. It will remain a capital for over 1,100 years. Today you call it Istanbul." },
  { year: 340, title: "The African superpower", text: "The kingdom of Aksum is booming: its own gold coinage, Red Sea trade routes, giant carved stone obelisks — and one of the first states anywhere to adopt Christianity." },
  { year: 350, title: "The stirrup arrives", text: "Around now the humble stirrup spreads west from Asia. Two little foot-loops quietly revolutionise cavalry — and with it, the next thousand years of warfare." },
  { year: 357, title: "Emperor on a sightseeing trip", text: "Constantius II visits Rome — technically his own city — for the first time, and tours it slack-jawed like any tourist, declaring the Forum beyond imitation." },
  { year: 361, title: "The Beard-Hater", text: "Emperor Julian, mocked by city crowds for his scruffy philosopher's beard, claps back by publishing a satire about himself titled 'Misopogon' — literally, 'Beard-Hater'." },
  { year: 367, title: "Everyone attacks at once", text: "Picts, Scotti and Saxons assault Roman Britain simultaneously in the 'Great Conspiracy' — somehow coordinated without a single group chat." },
  { year: 370, title: "Riders on the horizon", text: "The Huns appear at Europe's eastern edge — riders so at home on horseback that Romans claim they eat and sleep in the saddle. The dominoes begin to tip." },
  { year: 378, title: "Disaster at Adrianople", text: "Gothic cavalry annihilates a Roman army at Adrianople and Emperor Valens dies on the field. Many historians call it the beginning of the end for the western empire." },
  { year: 386, title: "Cliff carvers", text: "The Northern Wei dynasty is founded in China by steppe horsemen — who go on to carve colossal Buddhas, some 17 metres tall, straight into the cliffs at Yungang." },
  { year: 393, title: "The last torch", text: "After roughly 1,170 years, the ancient Olympic Games are held for the final time. The torch stays out for 1,503 years — until Athens, 1896." },
  { year: 394, title: "The wind picks a winner", text: "At the Battle of the Frigidus, a hurricane-force bora wind blasts dust into one army's faces and hurls their own arrows back at them. Weather: 1, Western army: 0." },
  { year: 397, title: "Sorry about the pears", text: "Augustine writes his Confessions — arguably the first true autobiography — including a lengthy apology for stealing pears as a teenager, purely for the thrill of it." },
  { year: 400, title: "Navigating by the stars", text: "Around now, by some estimates, Polynesian voyagers in double-hulled canoes reach Hawai'i — crossing 4,000 km of open Pacific with no instruments. Just stars, swells and birds." },
  { year: 402, title: "Protected by mosquitoes", text: "The Western court moves its capital to Ravenna, a city ringed by marshes — very hard for armies to reach and, courtiers soon discover, absolutely full of insects." },
  { year: 404, title: "The last gladiators", text: "Around now Rome's gladiator games fade out for good — tradition credits a monk named Telemachus who leapt into the arena to stop a fight." },
  { year: 408, title: "Pepper as ransom", text: "Alaric the Goth besieges Rome and demands a ransom: gold, silver, silk — and 3,000 pounds of black pepper. Spices were genuinely that valuable." },
  { year: 410, title: "But the chicken's fine", text: "Rome is sacked for the first time in 800 years. Told 'Rome has perished', Emperor Honorius allegedly panics about his beloved pet chicken, named Roma — then sighs with relief on learning it was only the city." },
  { year: 415, title: "Hypatia of Alexandria", text: "Hypatia — mathematician, astronomer and the most famous scholar in Alexandria — is at the height of her renown, lecturing on philosophy and refining astronomical tables." },
  { year: 421, title: "A city on stilts", text: "Tradition says Venice is founded at exactly noon on 25 March 421, by refugees driving wooden piles into a lagoon. The 'temporary' refuge is still afloat 1,600 years later." },
  { year: 425, title: "Enrolment now open", text: "Theodosius II founds the University of Constantinople: 31 salaried professorships in grammar, rhetoric, law and philosophy. Student loans: not yet invented." },
  { year: 429, title: "An empire goes to sea", text: "Genseric leads the entire Vandal people — tens of thousands — by boat to North Africa, where they seize Rome's breadbasket and build a pirate kingdom." },
  { year: 433, title: "Attila takes the reins", text: "Attila becomes ruler of the Huns. Rome's strategy: pay him roughly 700 pounds of gold a year to please, please go somewhere else." },
  { year: 438, title: "All the laws, one book", text: "The Theodosian Code is published: every imperial law since Constantine, organised in a single collection. Lawyers across two empires sigh in relief." },
  { year: 446, title: "The groans of the Britons", text: "Abandoned Britain sends Rome a desperate plea for military help. Rome's reply, in essence: terribly sorry, you're on your own now. Britain starts hiring mercenaries." },
  { year: 449, title: "The bodyguards stay", text: "By tradition, Britons invite the Saxon warriors Hengist and Horsa as hired muscle against the Picts. The hired muscle looks around, likes the place, and sends for relatives." },
  { year: 451, title: "Showdown in Gaul", text: "At the Catalaunian Plains, Romans and Visigoths — bitter enemies until five minutes ago — team up to stop Attila in one of the last great victories of the western empire." },
  { year: 453, title: "Attila's last toast", text: "Attila the Hun, scourge of two empires, dies of a nosebleed at his own wedding feast. Within two years, his vast empire dissolves." },
  { year: 455, title: "The original vandals", text: "The Vandals sack Rome so thoroughly that 1,300 years later their name becomes the word 'vandalism'. Harsh branding, honestly — accounts suggest they mostly looted politely." },
  { year: 461, title: "The man with no snakes", text: "Tradition dates the death of St Patrick — famous for banishing the snakes from Ireland. Ireland, scientists note, never had any snakes. The greatest PR coup in history." },
  { year: 468, title: "The billion-sesterce bonfire", text: "Rome and Constantinople pool a colossal fortune into a vast fleet to crush the Vandals. Fire-ships burn much of it at anchor. The West never financially recovers." },
  { year: 472, title: "Vesuvius, again", text: "The volcano that buried Pompeii erupts so violently that ash reportedly falls on Constantinople, 1,200 km away. Locals commemorate the date for decades." },
  { year: 476, title: "Not with a bang", text: "The last western emperor — a teenager named Romulus Augustulus — is quietly deposed and sent to a seaside villa with a pension. The Western Roman Empire ends with a retirement package." },
  { year: 481, title: "The first French king-ish", text: "Fifteen-year-old Clovis becomes king of the Franks — the tribe that gives France its name, and gives us the word 'frank': free, blunt, honest." },
  { year: 493, title: "The Goth who loved baths", text: "Theodoric the Great takes Italy and rules it Roman-style: repairing aqueducts, funding chariot races and keeping the baths open. Goths: surprisingly good civic managers." },
  { year: 495, title: "Enter the Shaolin", text: "The Shaolin Monastery is founded on Mount Song in China — the future legendary home of kung fu. Somewhere, a gong sounds." },
  { year: 499, title: "The Earth spins, says the maths", text: "Indian mathematician Aryabhata, aged 23, publishes a treatise calculating pi to four decimal places and proposing the Earth rotates on its axis. He's right, obviously." },
  { year: 500, title: "Enter the legend", text: "Around now, tradition places the Battle of Badon Hill — the victory later credited to a war leader named Arthur. Somewhere here, history fades into Camelot." },
];

/* ★ DAILY GOAL — change if your target changes ★ */
const DAILY_GOAL = 50;
/* Celebrations fire at every multiple of this (25, 50, 75...) */
const MILESTONE_EVERY = 25;

/* ═════════════════ end of editable section ═════════════════ */

const FACT_MAP = Object.fromEntries(FACTS.map((f) => [f.year, f]));
const SORTED_FACT_YEARS = FACTS.map((f) => f.year).sort((a, b) => a - b);

/* daytime pixel palette: cream parchment, sky, terracotta, gold, teal, meadow green */
const C = {
  skyTop: "#a7d8e8", skyMid: "#cde8da", skyLow: "#f2e9cf",
  panel: "#faf3e1", panelDk: "#f0e6cc", ink: "#332f47", line: "#c9bda0",
  coral: "#dd6747", gold: "#dfa92e", teal: "#2f9e96", green: "#74a85e",
  blue: "#5b8dd9", text: "#332f47", dim: "#8a8198",
};

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const sanitizeKey = (name) => name.trim().replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);

/* ── storage helpers (timeout-protected; degrade to in-memory demo mode) ── */
const memStore = {};
const hasStorage = () => typeof window !== "undefined" && !!window.storage;
/* never let a storage call hang the app: give up after 3s */
function withTimeout(promise, ms = 3000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("storage timeout")), ms)),
  ]);
}
async function sGet(key, shared = false) {
  if (!hasStorage()) return memStore[(shared ? "s:" : "p:") + key] ?? null;
  try { const r = await withTimeout(window.storage.get(key, shared)); return r ? r.value : null; }
  catch { return null; }
}
async function sSet(key, value, shared = false) {
  if (!hasStorage()) { memStore[(shared ? "s:" : "p:") + key] = value; return; }
  try { await withTimeout(window.storage.set(key, value, shared)); } catch (e) { console.error("save failed", e); }
}
async function sList(prefix, shared = false) {
  if (!hasStorage()) return Object.keys(memStore).filter((k) => k.startsWith((shared ? "s:" : "p:") + prefix)).map((k) => k.slice(2));
  try { const r = await withTimeout(window.storage.list(prefix, shared)); return r && r.keys ? r.keys : []; }
  catch { return []; }
}

export default function ColdCallTimeMachine() {
  const [phase, setPhase] = useState("loading"); // loading | name | play
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");
  const [player, setPlayer] = useState(null); // {name, key, total, daily, dailyDate}
  const [board, setBoard] = useState([]);
  const [fact, setFact] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const [banner, setBanner] = useState("");
  const [boardBusy, setBoardBusy] = useState(false);
  const audioRef = useRef(null);
  const saveTimer = useRef(null);
  const hereRef = useRef(null);

  /* ── fonts ── */
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Jacquard+12&family=Silkscreen:wght@400;700&family=Pixelify+Sans:wght@400;600;700&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch {} };
  }, []);

  /* ── chiptune sfx ── */
  const beep = useCallback((freq, at, dur, type = "square", vol = 0.1) => {
    try {
      if (!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      const t = ctx.currentTime + at;
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + dur + 0.05);
    } catch {}
  }, []);
  const sfxBlip = useCallback(() => { beep(740, 0, 0.07); beep(988, 0.06, 0.07); }, [beep]);
  const sfxUndo = useCallback(() => { beep(440, 0, 0.08); beep(330, 0.07, 0.1); }, [beep]);
  const sfxFact = useCallback(() => { [523, 659, 784, 1047].forEach((f, i) => beep(f, i * 0.09, 0.12, "triangle", 0.14)); }, [beep]);
  const sfxFanfare = useCallback(() => {
    [392, 523, 659, 784].forEach((f, i) => beep(f, i * 0.1, 0.13, "square", 0.12));
    beep(1046, 0.42, 0.4, "square", 0.13); beep(523, 0.42, 0.4, "triangle", 0.1);
  }, [beep]);

  /* ── boot: who am I? ── */
  useEffect(() => {
    let done = false;
    /* hard fallback: never stay stuck on the loading screen */
    const failsafe = setTimeout(() => {
      if (!done) setPhase((ph) => (ph === "loading" ? "name" : ph));
    }, 5000);
    (async () => {
      try {
        const meKey = await sGet("me");
        if (meKey) {
          const raw = await sGet("player:" + meKey, true);
          if (raw) {
            const p = JSON.parse(raw);
            setPlayer({ ...p, key: meKey });
            setPhase("play");
            refreshBoard();
            return;
          }
        }
        setPhase("name");
      } catch (e) {
        console.error("boot failed", e);
        setPhase("name");
      } finally {
        done = true;
        clearTimeout(failsafe);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── leaderboard ── */
  const refreshBoard = useCallback(async () => {
    setBoardBusy(true);
    const keys = await sList("player:", true);
    const rows = [];
    for (const k of keys) {
      const raw = await sGet(k, true);
      if (!raw) continue;
      try { rows.push({ ...JSON.parse(raw), key: k.replace("player:", "") }); } catch {}
    }
    rows.sort((a, b) => b.total - a.total);
    setBoard(rows);
    setBoardBusy(false);
  }, []);

  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(refreshBoard, 45000);
    return () => clearInterval(id);
  }, [phase, refreshBoard]);

  /* ── keep the traveller in view as the path fills in ── */
  const total = player?.total ?? 0;
  useEffect(() => {
    if (phase !== "play") return;
    const t = setTimeout(() => {
      if (hereRef.current) {
        hereRef.current.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }, 80);
    return () => clearTimeout(t);
  }, [total, phase]);

  /* ── persistence (debounced a touch so rapid taps don't spam) ── */
  const persist = useCallback((p) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      sSet("player:" + p.key, JSON.stringify({ name: p.name, total: p.total, daily: p.daily, dailyDate: p.dailyDate, updatedAt: Date.now() }), true);
    }, 400);
  }, []);

  /* ── join / login ── */
  const join = async () => {
    const name = nameInput.trim();
    if (!name) { setNameError("Type a name to begin the journey."); return; }
    const key = sanitizeKey(name);
    if (!key) { setNameError("Use letters or numbers in your name."); return; }
    setNameError("");
    setPhase("loading");
    try {
      let p;
      const existing = await sGet("player:" + key, true);
      if (existing) {
        try { p = { ...JSON.parse(existing), key }; setBanner(`Welcome back, ${p.name} — journey resumed.`); }
        catch { p = null; }
      }
      if (!p) {
        p = { name, key, total: 0, daily: 0, dailyDate: todayStr() };
        await sSet("player:" + key, JSON.stringify(p), true);
        setBanner("A new traveller steps onto the road…");
      }
      await sSet("me", key);
      setPlayer(p);
      setPhase("play");
      refreshBoard();
      setTimeout(() => setBanner(""), 4000);
    } catch (e) {
      console.error("join failed", e);
      setPhase("name");
      setNameError("Something went wrong saving — try again.");
    }
  };

  const switchPlayer = async () => {
    await sSet("me", "");
    setPlayer(null); setNameInput(""); setPhase("name");
  };

  /* ── confetti ── */
  const popConfetti = useCallback(() => {
    const colors = [C.coral, C.gold, C.teal, C.green, C.blue];
    const pieces = Array.from({ length: 70 }, (_, i) => ({
      id: Date.now() + "-" + i,
      left: Math.random() * 100,
      color: colors[i % colors.length],
      delay: Math.random() * 0.4,
      dur: 1.6 + Math.random() * 1.4,
      size: 5 + Math.floor(Math.random() * 3) * 3,
      sway: (Math.random() - 0.5) * 160,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3400);
  }, []);

  /* ── THE BUTTON ── */
  const logCall = () => {
    if (!player) return;
    const t = todayStr();
    const daily = (player.dailyDate === t ? player.daily : 0) + 1;
    const newTotal = player.total + 1;
    const p = { ...player, daily, dailyDate: t, total: newTotal };
    setPlayer(p);
    persist(p);
    setBoard((b) => {
      const rest = b.filter((r) => r.key !== p.key);
      return [...rest, { name: p.name, key: p.key, total: p.total, daily: p.daily, dailyDate: p.dailyDate }].sort((a, b2) => b2.total - a.total);
    });

    const hitFact = FACT_MAP[newTotal];
    const hitMilestone = daily % MILESTONE_EVERY === 0;
    if (hitMilestone) { popConfetti(); sfxFanfare(); }
    if (hitFact) { setTimeout(() => setFact({ ...hitFact, fresh: true }), hitMilestone ? 650 : 220); if (!hitMilestone) sfxFact(); }
    if (!hitFact && !hitMilestone) sfxBlip();
  };

  const undo = () => {
    if (!player) return;
    const t = todayStr();
    if (player.dailyDate !== t || player.daily <= 0 || player.total <= 0) return;
    const p = { ...player, daily: player.daily - 1, total: player.total - 1 };
    setPlayer(p); persist(p); sfxUndo();
    setBoard((b) => b.map((r) => (r.key === p.key ? { ...r, total: p.total, daily: p.daily } : r)).sort((a, b2) => b2.total - a.total));
  };

  /* ── derived ── */
  const dailyNow = player && player.dailyDate === todayStr() ? player.daily : 0;
  const nextFactYear = SORTED_FACT_YEARS.find((y) => y > total);
  const callsToFact = nextFactYear != null ? nextFactYear - total : null;
  const pct = Math.min(100, (dailyNow / DAILY_GOAL) * 100);

  /* path: a left-to-right road, filled in behind the traveller */
  const start = Math.max(0, total - 15);
  const years = Array.from({ length: 45 }, (_, i) => start + i);

  const fmtYear = (y) => (y === 0 ? "YEAR 0" : `${y} AD`);

  return (
    <div className="cct-root">
      <style>{css}</style>
      <div className="sun" aria-hidden="true" />
      <div className="cloud c1" aria-hidden="true" />
      <div className="cloud c2" aria-hidden="true" />

      {/* confetti overlay */}
      <div className="confetti-layer" aria-hidden="true">
        {confetti.map((p) => (
          <span key={p.id} className="confetto" style={{
            left: p.left + "%", background: p.color, width: p.size, height: p.size,
            animationDuration: p.dur + "s", animationDelay: p.delay + "s", "--sway": p.sway + "px",
          }} />
        ))}
      </div>

      <main className="frame">
        <header className="masthead">
          <div className="mast-title">Cold Call<br />Time Machine</div>
          <div className="mast-sub">every call is a year · the road runs to 2026 and beyond</div>
        </header>

        {!hasStorage() && (
          <div className="notice">Demo mode — shared storage unavailable here, progress won't save.</div>
        )}
        {banner && <div className="notice ok">{banner}</div>}

        {phase === "loading" && <div className="loading">loading the timeline…</div>}

        {phase === "name" && (
          <section className="panel join">
            <div className="join-title">Who walks the road?</div>
            <p className="join-copy">Pick your traveller name. Use the same name on any device to resume your journey. Your progress appears on the team board for everyone using this app.</p>
            <input
              className="pixel-input" value={nameInput} maxLength={24}
              placeholder="e.g. Sam" onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && join()}
            />
            {nameError && <div className="err">{nameError}</div>}
            <button className="big-btn" onClick={join}>Begin in Year 0</button>
          </section>
        )}

        {phase === "play" && player && (
          <>
            {/* year marquee */}
            <section className="panel yearbox">
              <div className="eyebrow">{player.name} · the journey so far</div>
              <div className="bigyear">{fmtYear(total)}</div>
              <div className="hint">
                {callsToFact != null
                  ? callsToFact === 0
                    ? "a discovery awaits…"
                    : <>next discovery in <b>{callsToFact}</b> {callsToFact === 1 ? "call" : "calls"} <span className="rune">✦</span></>
                  : "you've passed the last charted discovery — more history coming soon"}
              </div>
            </section>

            {/* daily bar */}
            <section className="panel">
              <div className="bar-head">
                <span className="eyebrow">today</span>
                <span className="bar-count">{dailyNow} <em>/ {DAILY_GOAL}</em></span>
              </div>
              <div className="bar">
                <div className="bar-fill" style={{ width: pct + "%" }} />
                <div className="bar-mark" style={{ left: "50%" }} />
              </div>
              <div className="bar-foot">
                {dailyNow >= DAILY_GOAL ? "DAILY GOAL SMASHED ★ every call now is bonus history"
                  : dailyNow >= DAILY_GOAL / 2 ? "halfway — the road is warming up"
                  : "resets at midnight · the timeline never does"}
              </div>
            </section>

            {/* the button */}
            <section className="controls">
              <button className="big-btn log" onClick={logCall}>
                ☎ LOG CALL <span className="plus">+1 YEAR</span>
              </button>
              <button className="ghost-btn" onClick={undo} disabled={dailyNow <= 0} title="Remove an accidental tap">
                ↩ undo
              </button>
            </section>

            {/* the road, flowing left to right */}
            <section className="panel roadbox">
              <div className="bar-head">
                <span className="eyebrow">the road through history</span>
                <span className="road-tip">‹ swipe ›</span>
              </div>
              <div className="road-scroll">
                <div className="road-track">
                  {years.map((y) => {
                    const isHere = y === total;
                    const f = FACT_MAP[y];
                    const past = y < total;
                    const cls = [
                      "sq",
                      past && "past",
                      isHere && "here",
                      f && (y <= total ? "fact-found" : "fact-glow"),
                    ].filter(Boolean).join(" ");
                    return (
                      <button
                        key={y} className={cls} ref={isHere ? hereRef : null}
                        onClick={() => { if (f && y <= total) { setFact({ ...f, fresh: false }); sfxFact(); } }}
                        aria-label={f ? `Year ${y}, discovery${y <= total ? " (tap to read)" : " ahead"}` : `Year ${y}`}
                      >
                        {f && <span className="sq-rune">✦</span>}
                        <span className="sq-year">{y}</span>
                        {isHere && <Wanderer />}
                      </button>
                    );
                  })}
                  <div className="road-more">→</div>
                </div>
              </div>
              <div className="legend">
                <span><i className="key k-past" /> travelled</span>
                <span><i className="key k-glow" /> discovery ahead</span>
                <span><i className="key k-found" /> found · tap to reread</span>
              </div>
            </section>

            {/* leaderboard */}
            <section className="panel">
              <div className="bar-head">
                <span className="eyebrow">fellow travellers</span>
                <button className="tiny-btn" onClick={refreshBoard} disabled={boardBusy}>{boardBusy ? "…" : "↻ refresh"}</button>
              </div>
              {board.length === 0 && <div className="empty">No travellers yet — log a call to put yourself on the map.</div>}
              {board.map((r, i) => {
                const d = r.dailyDate === todayStr() ? r.daily : 0;
                return (
                  <div className={"lb-row" + (r.key === player.key ? " me" : "")} key={r.key}>
                    <span className="lb-rank">{i + 1}</span>
                    <span className="lb-name">{r.name}</span>
                    <span className="lb-year">{fmtYear(r.total)}</span>
                    <span className="lb-today">{d}<em>/{DAILY_GOAL} today</em></span>
                  </div>
                );
              })}
              <button className="tiny-btn switch" onClick={switchPlayer}>switch traveller</button>
            </section>

            <footer className="foot">unlocks ahead · 2026: the time machine · 2500 BC: a visitor at Stonehenge</footer>
          </>
        )}
      </main>

      {/* fact modal */}
      {fact && (
        <div className="modal-veil" onClick={() => setFact(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-rune">✦</div>
            <div className="modal-year">{fmtYear(fact.year)}</div>
            <div className="modal-title">{fact.title}</div>
            <p className="modal-text">{fact.text}</p>
            <button className="big-btn" onClick={() => setFact(null)}>
              {fact.fresh ? "Onward through time" : "Back to the road"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* tiny terracotta-cloaked pixel wanderer */
function Wanderer() {
  const s = 3;
  const px = (x, y, c) => `${x * s}px ${y * s}px 0 ${c}`;
  const skin = "#ffe2b8", cloak = "#dd6747", cloakDk = "#b14a31", scarf = "#2f9e96", boot = "#3a3354";
  const shadow = [
    px(3, 0, skin), px(4, 0, skin),
    px(2, 1, skin), px(3, 1, "#332f47"), px(4, 1, skin), px(5, 1, skin),
    px(2, 2, scarf), px(3, 2, scarf), px(4, 2, scarf), px(5, 2, scarf),
    px(2, 3, cloak), px(3, 3, cloak), px(4, 3, cloak), px(5, 3, cloakDk),
    px(1, 4, cloak), px(2, 4, cloak), px(3, 4, cloak), px(4, 4, cloak), px(5, 4, cloak), px(6, 4, cloakDk),
    px(1, 5, cloak), px(2, 5, cloak), px(3, 5, cloak), px(4, 5, cloak), px(5, 5, cloak), px(6, 5, cloakDk),
    px(0, 6, cloak), px(1, 6, cloak), px(2, 6, cloak), px(3, 6, cloak), px(4, 6, cloak), px(5, 6, cloakDk), px(6, 6, cloakDk),
    px(2, 7, boot), px(5, 7, boot),
  ].join(",");
  return (
    <span className="wanderer" aria-hidden="true">
      <span style={{ display: "block", width: s, height: s, boxShadow: shadow }} />
    </span>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Jacquard+12&family=Silkscreen:wght@400;700&family=Pixelify+Sans:wght@400;600;700&display=swap');

  .cct-root {
    min-height: 100vh; position: relative; overflow-x: hidden;
    background: linear-gradient(180deg, ${C.skyTop} 0%, ${C.skyMid} 48%, ${C.skyLow} 100%);
    color: ${C.text}; font-family: 'Pixelify Sans', monospace;
    image-rendering: pixelated;
  }
  .sun { position: fixed; top: 24px; right: 24px; width: 38px; height: 38px;
    background: ${C.gold}; border-radius: 50%;
    box-shadow: 0 0 0 6px #dfa92e44, 0 0 28px #dfa92e66; pointer-events: none; }
  .cloud { position: fixed; height: 14px; background: #ffffffd9; pointer-events: none;
    box-shadow: 14px -10px 0 0 #ffffffd9, 34px -6px 0 0 #ffffffc9, -14px -4px 0 0 #ffffffc9;
    animation: drift 70s linear infinite; }
  .cloud.c1 { top: 70px; left: -120px; width: 64px; }
  .cloud.c2 { top: 150px; left: -260px; width: 48px; animation-duration: 95s; opacity: .8; }
  @keyframes drift { from { transform: translateX(0); } to { transform: translateX(130vw); } }

  .frame { max-width: 430px; margin: 0 auto; padding: 20px 14px 56px; position: relative; }

  .masthead { text-align: center; margin-bottom: 14px; }
  .mast-title { font-family: 'Jacquard 12', 'Pixelify Sans', monospace;
    font-size: 46px; line-height: .92; letter-spacing: 1px; color: ${C.ink};
    text-shadow: 3px 3px 0 #dd674755; }
  .mast-sub { margin-top: 8px; font-size: 12px; color: #5d5876; letter-spacing: .04em; }

  .panel { background: ${C.panel}; border: 3px solid ${C.ink};
    box-shadow: 0 0 0 2px #fffdf5, 6px 6px 0 0 #33304733;
    padding: 14px; margin-bottom: 16px; }

  .notice { background: ${C.panelDk}; border: 2px dashed ${C.dim}; color: #5d5876;
    font-size: 12px; padding: 8px 10px; margin-bottom: 12px; }
  .notice.ok { color: ${C.teal}; border-color: ${C.teal}; background: #e8f4ec; }
  .loading { text-align: center; color: #5d5876; padding: 40px 0; }

  .join-title { font-family: 'Jacquard 12', monospace; font-size: 30px; margin-bottom: 6px; color: ${C.ink}; }
  .join-copy { font-size: 13px; color: #5d5876; line-height: 1.5; margin: 0 0 12px; }
  .pixel-input { width: 100%; box-sizing: border-box; background: #fffdf5; color: ${C.text};
    border: 3px solid ${C.line}; padding: 12px; font-family: 'Pixelify Sans', monospace;
    font-size: 17px; outline: none; margin-bottom: 12px; }
  .pixel-input:focus { border-color: ${C.teal}; box-shadow: 0 0 8px #2f9e9655; }
  .err { color: ${C.coral}; font-size: 12px; margin: -6px 0 10px; }

  .yearbox { text-align: center; }
  .eyebrow { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: ${C.dim}; }
  .bigyear { font-family: 'Silkscreen', 'Jacquard 12', monospace; font-size: 40px;
    color: ${C.coral}; margin: 6px 0 4px; text-shadow: 3px 3px 0 #dfa92e44; }
  .hint { font-size: 13px; color: ${C.text}; }
  .hint b { color: ${C.teal}; font-size: 15px; }
  .rune { color: ${C.gold}; }

  .bar-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
  .bar-count { font-family: 'Silkscreen', monospace; font-size: 26px; color: ${C.teal}; }
  .bar-count em { font-style: normal; font-size: 14px; color: ${C.dim}; }
  .bar { position: relative; height: 22px; background: #fffdf5; border: 2px solid ${C.ink}; }
  .bar-fill { height: 100%; background: repeating-linear-gradient(90deg,
      ${C.teal} 0 8px, ${C.green} 8px 16px);
    transition: width .25s steps(6); }
  .bar-mark { position: absolute; top: -2px; bottom: -2px; width: 2px; background: ${C.gold}; }
  .bar-foot { margin-top: 7px; font-size: 11px; color: ${C.dim}; letter-spacing: .03em; }

  .controls { display: flex; gap: 10px; align-items: stretch; margin-bottom: 16px; }
  .big-btn { flex: 1; font-family: 'Pixelify Sans', monospace; font-weight: 700;
    font-size: 21px; letter-spacing: .03em; color: #fffdf5;
    background: linear-gradient(180deg, ${C.coral}, #c2522f);
    border: 3px solid ${C.ink}; box-shadow: 0 5px 0 0 ${C.ink};
    padding: 16px 10px; cursor: pointer; transition: transform .05s; }
  .big-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 0 ${C.ink}; }
  .big-btn.log .plus { display: block; font-size: 11px; font-weight: 400; letter-spacing: .2em; color: #ffe3d6; }
  .ghost-btn { font-family: inherit; font-size: 13px; color: #5d5876;
    background: ${C.panel}; border: 3px solid ${C.line}; padding: 0 14px; cursor: pointer; }
  .ghost-btn:disabled { opacity: .4; cursor: default; }
  .ghost-btn:not(:disabled):hover { color: ${C.text}; border-color: ${C.dim}; }

  .road-tip { font-size: 11px; color: ${C.dim}; }
  .road-scroll { overflow-x: auto; padding: 22px 2px 8px; margin: 0 -4px;
    scrollbar-width: thin; scrollbar-color: ${C.line} transparent; }
  .road-track { display: flex; align-items: flex-end; gap: 7px; position: relative;
    width: max-content; padding: 0 6px; }
  .road-track::before { content: ""; position: absolute; left: 0; right: 0; bottom: 23px;
    height: 4px; z-index: 0;
    background: repeating-linear-gradient(90deg, ${C.line} 0 10px, transparent 10px 17px); }
  .sq { position: relative; z-index: 1; width: 50px; height: 50px; flex: none;
    background: #fffdf5; border: 2px solid ${C.line}; cursor: default;
    display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
    padding-bottom: 3px; font-family: inherit; }
  .sq-year { font-size: 10px; color: ${C.dim}; pointer-events: none; }
  .sq.past { background: ${C.gold}; border-color: #b3851f; }
  .sq.past .sq-year { color: #6b500f; }
  .sq.here { background: #d7eeea; border-color: ${C.teal};
    box-shadow: 0 0 10px #2f9e9655; }
  .sq.here .sq-year { color: #1d6660; font-weight: 700; }
  .sq-rune { position: absolute; top: 3px; left: 0; right: 0; text-align: center;
    font-size: 13px; color: ${C.gold}; pointer-events: none; }
  .sq.fact-glow { border-color: ${C.coral}; animation: pulse 1.6s ease-in-out infinite; }
  .sq.fact-glow .sq-rune { color: ${C.coral}; }
  .sq.fact-found { cursor: pointer; }
  .sq.fact-found .sq-rune { color: #fffdf5; text-shadow: 1px 1px 0 #b3851f; }
  .sq.fact-found:not(.past):not(.here) { background: ${C.gold}; }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 3px #dd674733; }
    50% { box-shadow: 0 0 14px #dd6747aa; }
  }
  .road-more { align-self: center; color: ${C.dim}; font-size: 18px; padding: 0 4px; }
  .wanderer { position: absolute; left: 50%; top: 0;
    transform: translate(-11px, -16px); animation: bob 1.2s steps(2) infinite; z-index: 2; }
  @keyframes bob { 0%,100% { margin-top: 0; } 50% { margin-top: -2px; } }
  .legend { display: flex; flex-wrap: wrap; gap: 10px 16px; margin-top: 8px; font-size: 11px; color: ${C.dim}; }
  .key { display: inline-block; width: 10px; height: 10px; margin-right: 5px; vertical-align: -1px; }
  .k-past { background: ${C.gold}; border: 2px solid #b3851f; }
  .k-glow { background: #fffdf5; border: 2px solid ${C.coral}; }
  .k-found { background: ${C.gold}; border: 2px solid #b3851f; position: relative; }

  .lb-row { display: flex; align-items: baseline; gap: 10px; padding: 8px 6px;
    border-bottom: 2px solid #e4d9bd; font-size: 14px; }
  .lb-row.me { background: #e3f1ed; outline: 2px solid #2f9e9655; }
  .lb-rank { font-family: 'Silkscreen', monospace; color: ${C.coral}; width: 18px; font-size: 17px; }
  .lb-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lb-year { color: #b3851f; font-size: 13px; }
  .lb-today { color: ${C.teal}; font-size: 13px; }
  .lb-today em { font-style: normal; color: ${C.dim}; font-size: 11px; }
  .empty { color: ${C.dim}; font-size: 13px; padding: 10px 4px; }
  .tiny-btn { font-family: inherit; font-size: 11px; color: #5d5876; background: none;
    border: 2px solid ${C.line}; padding: 4px 8px; cursor: pointer; }
  .tiny-btn:hover { color: ${C.text}; border-color: ${C.dim}; }
  .tiny-btn.switch { margin-top: 12px; }

  .foot { text-align: center; font-size: 11px; color: #8a8198; letter-spacing: .06em; }

  .modal-veil { position: fixed; inset: 0; background: #332f47cc; z-index: 50;
    display: flex; align-items: center; justify-content: center; padding: 18px; }
  .modal { max-width: 380px; width: 100%; background: ${C.panel};
    border: 3px solid ${C.ink}; box-shadow: 0 0 0 3px ${C.gold}, 10px 10px 0 #1d192e88;
    padding: 22px 20px; text-align: center; animation: rise .25s steps(4); }
  @keyframes rise { from { transform: translateY(24px); opacity: 0; } to { transform: none; opacity: 1; } }
  .modal-rune { font-size: 26px; color: ${C.gold}; }
  .modal-year { font-family: 'Silkscreen', monospace; font-size: 24px; color: ${C.coral}; margin: 4px 0; }
  .modal-title { font-family: 'Jacquard 12', monospace; font-size: 26px; line-height: 1.05;
    color: ${C.ink}; margin-bottom: 10px; }
  .modal-text { font-size: 15px; line-height: 1.55; color: ${C.text}; margin: 0 0 18px; }

  .confetti-layer { position: fixed; inset: 0; pointer-events: none; z-index: 60; overflow: hidden; }
  .confetto { position: absolute; top: -12px; animation-name: drop;
    animation-timing-function: linear; animation-fill-mode: forwards; }
  @keyframes drop {
    0% { transform: translate(0, -12px) rotate(0deg); opacity: 1; }
    100% { transform: translate(var(--sway), 105vh) rotate(540deg); opacity: .9; }
  }

  @media (prefers-reduced-motion: reduce) {
    .sq.fact-glow, .wanderer, .modal, .confetto, .cloud { animation: none !important; }
  }
  button:focus-visible, input:focus-visible { outline: 3px solid ${C.teal}; outline-offset: 2px; }
`;
