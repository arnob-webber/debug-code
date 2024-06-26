let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
];

const monsters = [
  { name: "Slime", health: 30, xp: 10 },
  { name: "Fanged Beast", health: 60, xp: 20 },
  { name: "Dragon", health: 150, xp: 50 },
];

const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 10 },
  { name: "sword", power: 20 },
  { name: "axe", power: 30 },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// initialize stats text
xpText.innerText = xp;
healthText.innerText = health;
goldText.innerText = gold;

function update(location) {
  // console.log("Updating location to:", location.name);
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function fightDragon() {
  // console.log("Fighting dragon.");
}

function buyHealth() {
  if (gold >= 10) {
    health += 10;
    gold -= 10;
    updateStats();
  } else {
    text.innerText = "You don't have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (gold >= 30 && currentWeapon < weapons.length - 1) {
    gold -= 30;
    currentWeapon++;
    let newWeapon = weapons[currentWeapon].name;
    inventory.push(newWeapon);
    updateStats();
    text.innerText = `You bought a ${newWeapon}.`;
  } else {
    text.innerText = "You can't buy a new weapon.";
  }
}

function fightSlime() {
  fighting = monsters[0];
  startFight();
}

function fightBeast() {
  fighting = monsters[1];
  startFight();
}

function startFight() {
  monsterStats.style.display = "block";
  monsterName.innerText = fighting.name;
  monsterHealth = fighting.health;
  monsterHealthText.innerText = monsterHealth;
  text.innerText = `You are fighting a ${fighting.name}.`;
  button1.innerText = "Attack";
  button2.innerText = "Dodge";
  button3.innerText = "Run";
  button1.onclick = attack;
  button2.onclick = dodge;
  button3.onclick = goTown;
}

function attack() {
  // console.log("Attacking the monster.");
  monsterHealth -= weapons[currentWeapon].power;
  if (monsterHealth > 0) {
    monsterHealthText.innerText = monsterHealth;
    text.innerText = `You attacked the ${fighting.name} and dealt ${weapons[currentWeapon].power} damage.`;
  } else {
    text.innerText = `You defeated the ${fighting.name}!`;
    xp += fighting.xp;
    gold += Math.floor(Math.random() * 10) + 10; // Random gold between 10 and 20
    updateStats();
    monsterStats.style.display = "none";
  }
}

function dodge() {
  text.innerText = `You dodged the ${fighting.name}'s attack.`;
}

function updateStats() {
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
}

// Initialize game state
goTown();
