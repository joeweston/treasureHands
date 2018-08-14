var game = {
  tickspeed: 100,
  ticks: 0,
  state: "idle",
  area: "beginning",
  coord: [13,24],
  lastSafePlace: "beginning",
  lastSafePlaceCoord: [13,24],
}


var player = {
  hp: { value: 100, max: 100, idleIncrement: 1, healthyAt: 50},
  attack: { value: 20, base: 20, multiplier: 1, plusser: 0}//plusser not affexted by multi
}

var resources = {
  gold : { value: 0, increment: 1}
}


//================================================================================
//
//          enemies
//
//================================================================================




var specialMoves = {
  vampiric: function(enemy){
    if( enemy.hp.value <= enemy.hp.max){
      enemy.hp.value += enemy.attack;
    }
  },
  choking: function(enemy){
    if(player.hp.value * 2 > player.hp.max){
      player.hp.value -= Math.floor(player.hp.max * 0.6);
    }
  }
}



var enemies = {
  rat : { name: "rat", hp: { value: 100, max: 100},    attack: 5, goldDrops: [ [0, 50], [64, 50],[1000, 1] ], itemDrops: [ [false, 20], ["fattyWetWipe", 1000],["butterBalls", 3], ["butterCubes", 2], ["goldenWetWipe", 1] ]},
  slime : { name: "slime", hp: { value: 150, max: 150},    attack: 3, goldDrops: [ [0, 50], [50, 50] ], itemDrops: [ [false, 30], ["slimeMedal",1000], ["healthyWetWipe",10],["baggedGammon", 3], ["rareCandy", 2] ]},
  gunk : { name: "gunk", hp: { value: 350, max: 350},    attack: 1, goldDrops: [ [0, 50], [50, 70] ], itemDrops: [ [false, 20],["gunkMedal", 1000], ["woodenBlock", 1], ["lostCandy", 2] ]},
  sewerSnake : { name: "sewer snake",hp: { value: 200, max: 200},  attack: 15, goldDrops: [ [0, 50], [300, 50] ], itemDrops: [ [false, 20], ["sewerNugget",1000], ["missingCandy", 10], ["chemicalGravy", 3] ], specialMove:function(){specialMoves.choking(this);}, moveType: "choking"},
  worm: {name: "worm", hp: { value: 259, max: 259},    attack: 3, goldDrops: [ [0, 50], [13, 70] ], itemDrops: [ [false, 20],["wormMedal", 1000], ["wormTrophy", 7], ["wormIdol", 2] ]}, 
  maggot: {name: "maggot", hp: { value: 200, max: 200},    attack: 4, goldDrops: [ [0, 50], [68, 70] ], itemDrops: [ [false, 20],["maggotMedal", 1000], ["maggotTrophy", 7], ["maggotIdol", 2] ]}, 


  bat : { name: "bat", hp: { value: 400, max: 400},    attack: 8, goldDrops: [ [0, 50], [102, 50],[1000, 2] ], itemDrops: [ [false, 20], ["batMedal", 1000], ["batWing", 4],["frankCarsonsDressingRoom", 3] ]},
  cat : { name: "cat", hp: { value: 700, max: 700},    attack: 6, goldDrops: [ [0, 50], [143, 50],[1000, 1] ], itemDrops: [ [false, 20], ["catMedal", 1000], ["catWing", 7], ["theMoon", 3] ]},
  treasureRat : { name: "treasure rat", hp: { value: 100, max: 100}, attack: 1, goldDrops: [ [1000, 50],[10000, 1] ] },
  aRatCalledKevin : { name: "rat called Kevin", hp: { value: 630, max: 630},    attack: 15, goldDrops: [ [0, 50], [199, 50],[1000, 1] ], itemDrops: [ [false, 20], ["owlTooth", 1000], ["cannedSoup", 7], ["rubbings", 3] ]},
  succufish : { name: "succufish", hp: { value: 600, max: 600},    attack: 14, goldDrops: [ [0, 50], [123, 50],[1000, 1] ], itemDrops: [ [false, 20], ["tastyLiquid", 1000], ["rawHide", 7], ["theTwilightSagaCompleteBoxSet", 3] ]}, 

  giantRat : { name: "Giant rat",   hp: { value: 1000, max: 1000},    attack: 7, goldDrops: [ [0, 0], [500, 100] ], itemDrops: [ [false, 0], ["happysSludge",100] ] },
  giantRatVolume2 : { name: "Giant rat volume 2",   hp: { value: 2000, max: 2000},    attack: 14, goldDrops: [ [0, 0], [1000, 100] ], itemDrops: [ [false, 0], ["baggedHam",100] ] },
  giantRatVolume3 : { name: "Giant rat volume 3",   hp: { value: 4000, max: 4000},    attack: 30, goldDrops: [ [0, 0], [4000, 100] ], itemDrops: [ [false, 0], ["healingPad2",100] ] },
  vampire : { name: "vampire",hp: { value: 1000, max: 1000},    attack: 10, goldDrops: [ [0, 0], [800, 100] ], itemDrops: [ [false, 0], ["healingPad",100] ] ,specialMove:function(){specialMoves.vampiric(this);}, moveType: "vampiric"},
  demonLordEric : { name: "Demon Lord Eric",   hp: { value: 8000, max: 8000},    attack: 30, goldDrops: [ [0, 0], [4000, 100] ], itemDrops: [ [false, 0], ["healingPad3",100] ], specialMove:function(){specialMoves.vampiric(this);}, moveType: "vampiric" },


  wolf : { name: "wolf",  hp: { value: 300, max: 300},  attack: 15, goldDrops: [ [0, 50], [100, 50] ], itemDrops: [ [false, 20], ["katiePricesBiography", 1000], ["yuriGellarSpoon", 7] ]},
  bear : { name: "bear",    hp: { value: 500, max: 500},    attack: 25, goldDrops: [ [0, 50], [150, 50] ]},
  wildCat: {name: "wild cat", hp: { value: 504, max: 504},    attack: 20, goldDrops: [ [0, 50], [314, 70] ], itemDrops: [ [false, 20],["wildCatMedal", 1000], ["wildCatTrophy", 7], ["wildCatIdol", 2] ]}, 

  evilHedgeHog: {name: "evil hedge hog", hp: { value: 514, max: 514},    attack: 21, goldDrops: [ [0, 50], [351, 70] ], itemDrops: [ [false, 20],["evilHedgeHogMedal", 1000], ["evilHedgeHogTrophy", 7], ["evilHedgeHogIdol", 2] ]}, 
  tampingHedgeHog: {name: "tamping hedge hog", hp: { value: 442, max: 442},    attack: 17, goldDrops: [ [0, 50], [393, 70] ], itemDrops: [ [false, 20],["tampingHedgeHogMedal", 1000], ["tampingHedgeHogTrophy", 7], ["tampingHedgeHogIdol", 2] ]}, 
  lazerHedgeHog: {name: "lazer hedge hog", hp: { value: 605, max: 605},    attack: 32, goldDrops: [ [0, 50], [646, 70] ], itemDrops: [ [false, 20],["lazerHedgeHogMedal", 1000], ["lazerHedgeHogTrophy", 7], ["lazerHedgeHogIdol", 2] ]}, 

  mindBear: {name: "mind bear", hp: { value: 1003, max: 1003},    attack: 51, goldDrops: [ [0, 50], [1034, 70] ], itemDrops: [ [false, 20],["mindBearMedal", 1000], ["mindBearTrophy", 7], ["mindBearIdol", 2] ]}, 
  telepathyBear: {name: "telepathy bear", hp: { value: 1224, max: 1224},    attack: 45, goldDrops: [ [0, 50], [1001, 70] ], itemDrops: [ [false, 20],["telepathyBearMedal", 1000], ["telepathyBearTrophy", 7], ["telepathyBearIdol", 2] ]}, 
  neuralBlastBear: {name: "neural blast bear", hp: { value: 1052, max: 1052},    attack: 71, goldDrops: [ [0, 50], [1051, 70] ], itemDrops: [ [false, 20],["neuralBlastBearMedal", 1000], ["neuralBlastBearTrophy", 7], ["neuralBlastBearIdol", 2] ]}, 

}

//================================================================================
//
//          areas
//
//================================================================================

var areas = {
  beginnerShop:{
    name: "The beginners Shop",
    desc: "What a wonderfull shop. You can spend your hard earned gold here",
    travelDesc: "The way back is north.",
    north: "beginning",
    shop: true
  },
  beginning : {
    name: "The Beginning",
    desc: "You are at a flat area called the beginning. There seems to be an unlimited source of gold here.",
    travelDesc: "To your east is an informative path. To your west is an entance to an old sewer. There is a shop to you south. A large Rock is blocking the northern path",
    west: "sewers",
    blocked: {north: "ruinedPath"},
    south: "beginnerShop",
    safe: true,
    coord: [13,24]
  }, 
  mrCheap:{
    name: "Mr Cheap's Bargain Shop",
    desc: "Welcome to the secret shop of cheap things, congratulations on finding us!",
    travelDesc: "The shortcut back is west",
    shop: true
  },
  sewers: {
    name: "The sewers",
    desc: "It smells here.",
    travelDesc: "To your east is the beginning. The west is blocked by a giant Rat",
    east: "beginning",
    blocked: { west: "sewers2"},
    hasFight: true,
    enemyPool: [ [enemies.maggot, 20],[enemies.rat, 50], [enemies.slime, 50], [enemies.gunk, 20], [enemies.treasureRat, 1], [enemies.worm, 50] ],
    boss: enemies.giantRat,
    bossMessage: "The path west is no longer blocked",
    travelDescPostBoss: "To your east is the beginning. The west leads you further into the sewers"
  },
  sewers2: {
    name: "The deeper sewers",
    desc: "You are deeper in the sewers.",
    travelDesc: "To your far east is the exit, there is a lever on the wall.",
    east: "sewers",
    north: "sewers2b",
    hasFight: true,
    enemyPool: [ [enemies.rat, 30], [enemies.slime, 30], [enemies.sewerSnake, 10], [enemies.bat, 30] ],
    action: {name: "pull lever", effect: "beginningUnlock"}
  },
  sewers2b: {
    name: "The deeper sewers",
    desc: "You are even deeper in the sewers.",
    travelDesc: "There is a giant Rat blocking the east",
    south: "sewers2",
    blocked: { east: "sewers1b"},
    hasFight: true,
    enemyPool:[ [ enemies.rat, 33], [enemies.bat, 33], [enemies.cat, 33], [enemies.worm, 33] ],
    boss: enemies.giantRatVolume2,
    bossMessage: "The path east is no longer blocked",
    travelDescPostBoss: ""
  },
  sewers1b: {
    name: "The deeper sewers",
    desc: "You are even deeper in the sewers.",
    travelDesc: "",
    west: "sewers2b",
    blocked: { north: "sewersShop"},
    boss: enemies.giantRatVolume3,
    bossMessage: "The path north is no longer blocked",
    hasFight: true,
    enemyPool:[ [ enemies.aRatCalledKevin, 33], [enemies.succufish, 33], [enemies.cat, 33] ],
  },
  sewersShop:{
    name: "The Amazing Sewer Shop",
    desc: "Welcome to the sewer shop. Enjoy all the flushed away goodies!",
    travelDesc: "You've travelled a long way to get here",
    shop: true,
    south: "sewers1b",
    west: "sewers2c"
  },
  sewers2c: {
    name: "The deeper sewers",
    desc: "You are even deeper in the sewers.",
    travelDesc: "",
    east: "sewersShop",
    blocked: { west: "sewersEntrance"},
    boss: enemies.demonLordEric,
    bossMessage: "The demon lord cries and dies.",
  },
  sewersEntrance: {
    name: "Congrats, you completed the game",
    desc: "This is as much content as I will make for this build. Any newer versions will be made from scratch.",
    travelDesc: "",
    east: "sewers2c",
  },
  ruinedPath: {
    name: "A ruined Path",
    desc: "The path is ruined - completely ruined.",
    south: "beginning",
    blocked: { north: "forest"},
    travelDesc: "To you south is the beginning, that vampire is the only thing between you and the path north",
    boss: enemies.vampire,
    bossMessage: "The vampire vapourises. Path ruining sh$%",
    travelDescPostBoss: "To you south is the beginning, the path north is open"
  },
  forest: {
    name: "The forest",
    south: "ruinedPath",
    north: "hedgeHogGrove",
    east: "cleverBearCamp",
    hasFight: true,
    enemyPool: [ [enemies.wolf, 20], [enemies.bear, 20], [enemies.wildCat, 20] ]
  },
  hedgeHogGrove: {
    name: "Hedge-hog Grove",
    south: "forest",
    hasFight: true,
    enemyPool: [ [enemies.evilHedgeHog, 50], [enemies.tampingHedgeHog, 50], [enemies.lazerHedgeHog, 10] ]
  },
  cleverBearCamp: {
    name: "The clever bear camp",
    west: "forest",
    hasFight: true,
    enemyPool: [ [enemies.mindBear, 50], [enemies.telepathyBear, 50], [enemies.neuralBlastBear, 10] ]
  }
}

//================================================================================
//
//          inventory
//
//================================================================================
//
var items = {
  weapons: {
    fists:        {name: "fists",        attack: { base: 5, multiplier: 1, plusser: 0}, desc: "5 base damage"},
    woodenSword : {name: "wooden sword", attack: { base: 30, multiplier: 1, plusser: 0}, desc: "30 base damage"},
    woodenSpear : {name: "wooden spear", attack: { base: 0, multiplier: 1, plusser: 60}, desc: "60 raw damage" },
    woodenBlock : {name: "wooden block", attack: { base: 10, multiplier: 1.5, plusser: 10}, desc: "10 base, 10 raw, 1.5 multi"},
    ironSword :   {name: "iron sword",   attack: { base: 60, multiplier: 1, plusser: 0}, desc:"60 base damage" },
    ironSpear :   {name: "iron spear",   attack: { base: 0, multiplier: 1, plusser: 100}, desc:"100 base damage" },
    steelSword :   {name: "steel sword",   attack: { base: 60, multiplier: 1.5, plusser: 0}, desc:"120 base damage 1.5 multi" },
    megaSword:   {name: "mega sword",   attack: { base: 120, multiplier: 2, plusser: 0}, desc:"60 base damage 2 multi" },
  },
  accessories: {
    fattyWetWipe: {name: "fatty wet wipe", effect: ()=>{player.attack.base += random(10); updateAttack();}, desc:"base attack up" },
    goldenWetWipe: {name: "golden wet wipe", effect: ()=>resources.gold.increment++, desc:"GPS up"},
    healthyWetWipe: {name: "healthy wet wipe", effect: ()=>player.hp.max += 20, desc:"Max HP up"},
    sewerNugget: {name: "sewer nugget", effect: ()=>{player.attack.plusser += 5; updateAttack();}, desc:"raw attack up"},
    happysSludge: {name: "happy sludge", effect: ()=>{player.attack.base += random(5); updateAttack();}, desc:"base attack up" },
    jerriesCherry: {name: "Jerries' cherry", effect: ()=>{player.attack.plusser += random(30); updateAttack();}, desc:"raw attack up" },
    theGoldMaker: {name: "the gold maker", effect: ()=>resources.gold.increment+= 10, desc:"GPS up"},
    slimeMedal: {name: "slime medal", effect: ()=>{resources.gold.increment++;player.hp.max += random(20);}, desc:"GPS up, Max HP up"},
    gunkMedal: {name: "gunk medal", effect: ()=>resources.gold.increment++, desc:"GPS up"},
    healingPad: {name: "healing pad", effect: ()=>player.hp.idleIncrement++, desc:"Idle healing up"},
    attackRock: {name: "attack-rock", effect: ()=>{player.attack.plusser += 10; updateAttack();}, desc:"raw attack up" },
    attackRock2: {name: "attack-rock2", effect: ()=>{player.attack.plusser += 11; updateAttack();}, desc:"raw attack up" },
    attackRock3: {name: "attack-rock3", effect: ()=>{player.attack.plusser += 12; updateAttack();}, desc:"raw attack up" },
    rareCandy: {name: "rare candy", effect: ()=>{player.attack.multiplier += 0.2; updateAttack();}, desc:"attack multi up" },
    missingCandy: {name: "missing candy", effect: ()=>{player.attack.multiplier += 0.2; updateAttack();}, desc:"attack multi up" },
    lostCandy: {name: "rare candy", effect: ()=>{player.attack.multiplier += 0.2; updateAttack();}, desc:"attack multi up" },
    batMedal: {name: "bat medal", effect: ()=>{resources.gold.increment++;player.hp.max += random(20);}, desc:"GPS up, Max HP up"},
    batWing: {name: "bat wing", effect: ()=>{player.attack.plusser += 32;player.hp.max += random(20);}, desc:"raw attack up"},
    healingPad2: {name: "healing pad 2", effect: ()=>player.hp.idleIncrement += 2, desc:"Idle healing up"},
    healingPad3: {name: "healing pad 3", effect: ()=>player.hp.idleIncrement += 3, desc:"Idle healing up"},


    catMedal: {name: "cat medal", effect: ()=>{resources.gold.increment++;player.hp.max += random(20);}, desc:"GPS up, Max HP up"},
    catWing: {name: "cat wing", effect: ()=>{player.hp.healthyAt -= 10;}, desc:"cats don't have wings - does nothing?"},
    
    owlTooth: {name: "owl tooth", effect:()=>{player.attack.multiplier+=0.1;updateAttack();}, desc:"Attack multi up 0.1"},
    cannedSoup: {name: "canned soup", effect:()=>{resources.gold.increment+=1;}, desc:"GPS up 1"},
    tastyLiquid: {name: "tasty liquid", effect:()=>{player.attack.plusser+=16;updateAttack();}, desc:"Raw Attack up 16"},
    rawHide: {name: "raw hide", effect:()=>{player.attack.multiplier+=0.18;updateAttack();}, desc:"Attack multi up 0.18"},
    baggedHam: {name: "bagged ham", effect:()=>{resources.gold.increment+=1;player.hp.max += random(20);}, desc:"GPS up 1 and max HP up"},
    baggedGammon: {name: "bagged gammon", effect:()=>{player.attack.plusser+=22;updateAttack();}, desc:"Raw Attack up 22"},
    butterBalls: {name: "butter balls", effect:()=>{resources.gold.increment+=4;player.hp.max += random(20);}, desc:"GPS up 4 and max HP up"},
    butterCubes: {name: "butter cubes", effect:()=>{player.attack.plusser+=47;updateAttack();}, desc:"Raw Attack up 47"},
    frankCarsonsDressingRoom: {name: "Frank Carson's dressing room", effect:()=>{resources.gold.increment+=3;player.hp.max += random(20);}, desc:"GPS up 3 and max HP up"},
    theMoon: {name: "the moon", effect:()=>{player.attack.plusser+=27;updateAttack();}, desc:"Raw Attack up 27"},
    rubbings: {name: "rubbings", effect:()=>{player.attack.plusser+=8;updateAttack();}, desc:"Raw Attack up 8"},
    theTwilightSagaCompleteBoxSet: {name: "the twilight saga complete box set", effect:()=>{player.attack.multiplier+=0.06;updateAttack();}, desc:"Attack multi up 0.06"},
    chemicalGravy: {name: "chemical gravy", effect:()=>{player.attack.plusser+=32;updateAttack();}, desc:"Raw Attack up 32"},
    katiePricesBiography: {name: "Katie Price's biography", effect:()=>{player.attack.base+=4;updateAttack();}, desc:"Attack base up 4"},
    yuriGellarSpoon: {name: "Yuri Gellar spoon", effect:()=>{player.attack.base+=18;updateAttack();}, desc:"Attack base up 18, it's bent"},
    greenMouse: {name: "green mouse", effect:()=>{player.attack.plusser+=46;updateAttack();}, desc:"Raw Attack up 46"},

    wildCatMedal: {name: "wild cat medal", effect:()=>{player.attack.base+=4;updateAttack();}, desc:"Attack base up 4"},
    wildCatTrophy: {name: "wild cat trophy", effect:()=>{player.attack.multiplier+=0.2;updateAttack();}, desc:"Attack multi up 0.2"},
    wildCatIdol: {name: "wild cat idol", effect:()=>{player.attack.base+=15;updateAttack();}, desc:"Attack base up 15"},

    evilHedgeHogMedal: {name: "evil hedge hog medal", effect:()=>{player.attack.plusser+=50;updateAttack();}, desc:"Raw Attack up 50"},
    evilHedgeHogTrophy: {name: "evil hedge hog trophy", effect:()=>{player.attack.plusser+=29;updateAttack();}, desc:"Raw Attack up 29"},
    evilHedgeHogIdol: {name: "evil hedge hog idol", effect:()=>{player.attack.multiplier+=0.08;updateAttack();}, desc:"Attack multi up 0.08"},

    tampingHedgeHogMedal: {name: "tamping hedge hog medal", effect:()=>{player.attack.base+=20;updateAttack();}, desc:"Attack base up 20"},
    tampingHedgeHogTrophy: {name: "tamping hedge hog trophy", effect:()=>{resources.gold.increment+=4;}, desc:"GPS up 4"},
    tampingHedgeHogIdol: {name: "tamping hedge hog idol", effect:()=>{player.attack.plusser+=19;updateAttack();}, desc:"Raw Attack up 19"},

    lazerHedgeHogMedal: {name: "lazer hedge hog medal", effect:()=>{player.attack.plusser+=8;updateAttack();}, desc:"Raw Attack up 8"},
    lazerHedgeHogTrophy: {name: "lazer hedge hog trophy", effect:()=>{player.attack.multiplier+=0.2;updateAttack();}, desc:"Attack multi up 0.2"},
    lazerHedgeHogIdol: {name: "lazer hedge hog idol", effect:()=>{player.attack.plusser+=42;updateAttack();}, desc:"Raw Attack up 42"},

    mindBearMedal: {name: "mind bear medal", effect:()=>{player.attack.base+=5;updateAttack();}, desc:"Attack base up 5"},
    mindBearTrophy: {name: "mind bear trophy", effect:()=>{player.attack.base+=15;updateAttack();}, desc:"Attack base up 15"},
    mindBearIdol: {name: "mind bear idol", effect:()=>{resources.gold.increment+=2;player.hp.max += random(20);}, desc:"GPS up 2 and max HP up"},

    telepathyBearMedal: {name: "telepathy bear medal", effect:()=>{player.attack.base+=1;updateAttack();}, desc:"Attack base up 1"},
    telepathyBearTrophy: {name: "telepathy bear trophy", effect:()=>{resources.gold.increment+=5;}, desc:"GPS up 5"},
    telepathyBearIdol: {name: "telepathy bear idol", effect:()=>{player.attack.plusser+=17;updateAttack();}, desc:"Raw Attack up 17"},

    neuralBlastBearMedal: {name: "neural blast bear medal", effect:()=>{player.attack.plusser+=21;updateAttack();}, desc:"Raw Attack up 21"},
    neuralBlastBearTrophy: {name: "neural blast bear trophy", effect:()=>{resources.gold.increment+=2;player.hp.max += random(20);}, desc:"GPS up 2 and max HP up"},
    neuralBlastBearIdol: {name: "neural blast bear idol", effect:()=>{resources.gold.increment+=6;}, desc:"GPS up 6"},

    wormMedal: {name: "worm medal", effect:()=>{resources.gold.increment+=1;player.hp.max += random(20);}, desc:"GPS up 1 and max HP up"},
    wormTrophy: {name: "worm trophy", effect:()=>{player.attack.base+=11;updateAttack();}, desc:"Attack base up 11"},
    wormIdol: {name: "worm idol", effect:()=>{resources.gold.increment+=1;player.hp.max += random(20);}, desc:"GPS up 1 and max HP up"},

  maggotMedal: {name: "maggot medal", effect:()=>{player.attack.plusser+=24;updateAttack();}, desc:"Raw Attack up 24"},
  maggotTrophy: {name: "maggot trophy", effect:()=>{player.attack.plusser+=37;updateAttack();}, desc:"Raw Attack up 37"},
  maggotIdol: {name: "maggot idol", effect:()=>{player.attack.multiplier+=0.2;updateAttack();}, desc:"Attack multi up 0.2"},

  }
}


var inventory = {
  weapons: ["fists"],
  accessories: []
}

var equipped = {
  weapon: "fists"
}
var shops = {
  beginnerShop: {
    woodenSword: { price: 400, sold: false},
    woodenSpear: { price: 400, sold: false},
    ironSword: { price: 1500, sold: false},
    ironSpear: { price: 1500, sold: false},
    theGoldMaker: {price: 6000, sold: false},
    jerriesCherry: {price: 2000, sold: false},
    attackRock: {price: 1000, sold: false},
    attackRock2: {price: 2000, sold: false},
    attackRock3: {price: 4000, sold: false},
  },
  mrCheap: {
    ironSword: { price: 400, sold: false},
    theGoldMaker: {price: 600, sold: false},
    attackRock: {price: 1, sold: false},
  },
  sewersShop: {
    steelSword: { price: 100000, sold: false},
    megaSword: {price: 200000, sold: false},
  }
}

//var shopNames = ["Beginners Shop", "Mr Cheap"];

function equipWeapon(newWeapon){
  player.attack.base -= items.weapons[equipped.weapon].attack.base;
  player.attack.multiplier -= items.weapons[equipped.weapon].attack.multiplier;
  player.attack.plusser -= items.weapons[equipped.weapon].attack.plusser;

  equipped.weapon = newWeapon;

  player.attack.base += items.weapons[newWeapon].attack.base;
  player.attack.multiplier += items.weapons[newWeapon].attack.multiplier;
  player.attack.plusser += items.weapons[newWeapon].attack.plusser;

  updateAttack();
}
function aquireWeapon(newWeapon){
  inventory.weapons.push(newWeapon);
}

function aquireAccessory(newAccessory){
  inventory.accessories.push(newAccessory);
  items.accessories[newAccessory].effect();
}
function aquireItem(newItem){
  if(items.weapons.hasOwnProperty(newItem)){
    aquireWeapon(newItem);
    return items.weapons[newItem].name;
  } else {
    aquireAccessory(newItem);
    return items.accessories[newItem].name;
  }
}

function updateAttack(){
  player.attack.value = Math.floor(player.attack.base * player.attack.multiplier) + player.attack.plusser;
}

function buy(item, shop){
  let itemPrice = shops[shop][item].price;
  if (resources.gold.value < itemPrice){
    return false;
  }
  for (let specificShop in shops){
    if ( shops[specificShop].hasOwnProperty(item) ){
      shops[specificShop][item].sold = true;
    }
  }
  aquireItem(item);
  resources.gold.value -= itemPrice;
  return true;
}

function listShopWeapons(shop) {
  shop = shops[shop];
  let itemList = []
  for (let item in shop){
    if( items.weapons.hasOwnProperty(item) ){
      itemList.push([item,shop[item].price]);
    }
  }
  return itemList.sort( (a,b)=> {return a[1] - b[1]});
}

function listShopAccessories(shop) {
  shop = shops[shop];
  let itemList = []
  for (let item in shop){
    if( items.accessories.hasOwnProperty(item) ){
      itemList.push([item,shop[item].price]);
    }
  }
  return itemList.sort( (a,b)=> {return a[1] - b[1]});
}

//================================================================================
//
//          fighting
//
//================================================================================

var fightState = {
  enemy : null,
  isPlayerTurn: true,
  playerWin: null,
  fightMessage: "",
  goldDropped: 0,
  itemDropped: false,
  fightingBoss: false
}

function initiateFight(){
  if (fightState.fightingBoss === true){
    fightState.enemy = areas[game.area].boss;
  } else{
    fightState.enemy = weightedRandom(areas[game.area].enemyPool);
  }
  fightState.fightMessage = `You come across a ${fightState.enemy.name}`
  fightState.isPlayerTurn = true;
  fightState.goldDropped = weightedRandom(fightState.enemy.goldDrops);
  fightState.itemDropped = weightedRandom(fightState.enemy.itemDrops);
  game.state = "fighting"
}
function playerAttack(){
  fightState.enemy.hp.value -= player.attack.value;
  fightState.fightMessage = `You attack the ${fightState.enemy.name} dealing ${player.attack.value} damage`;
  fightState.isPlayerTurn = false;
  if (fightState.enemy.hp.value <= 0){
    fightState.playerWin = true;
    fightState.fightMessage += ' and make the kill'
    game.state = "fightOver";
  }
}

function enemyAttack(){
  player.hp.value -= fightState.enemy.attack;
  fightState.fightMessage = `The ${fightState.enemy.name} attacks you dealing ${fightState.enemy.attack} ${fightState.enemy.moveType?fightState.enemy.moveType:""} damage`;
  if (fightState.enemy.hasOwnProperty("specialMove")){
    fightState.enemy.specialMove();
  }
  fightState.isPlayerTurn = true;
  if (player.hp.value <= 0){
    fightState.playerWin = false;
    fightState.fightMessage = `The ${fightState.enemy.name} kills you dead!  Crawl to a safe place to heal.`
    game.state = "fightOver";
  }
}
function fight(){
  if (fightState.isPlayerTurn === true){
    playerAttack();
  } else {
    enemyAttack();
  }
}
function fightOver(){
  fightState.enemy.hp.value = fightState.enemy.hp.max;
  if (fightState.playerWin === true){
    fightState.fightMessage = ""
    if( fightState.itemDropped ){
      let itemName = aquireItem(fightState.itemDropped);
      fightState.fightMessage = `You found a ${itemName}!`;


      fightState.enemy.itemDrops = fightState.enemy.itemDrops.filter( v=>{
        return v[0] !== fightState.itemDropped;
      });
      if (fightState.enemy.itemDrops.length === 1){
        delete fightState.enemy.itemDrops;
      }


    }

    if( fightState.goldDropped !== 0){
      resources.gold.value += fightState.goldDropped;
      fightState.fightMessage += ` Found ${fightState.goldDropped} gold.`;
    } else{
      fightState.fightMessage += " No gold found :'(";
    }
    if(fightState.fightingBoss === true){
      bossDefeat();
      fightState.fightMessage += ` ${areas[game.area].bossMessage}`;
    }
  } else{
    player.hp.value = 0;
  }
  game.state = "idle";
}

function endFight(){ //redundant
  player.hp.value = 0;
  fightState.playerWin = false;
  game.state = "fightOver";
  fightState.fightMessage = "You collapse from giving up. Crawl to a safe place to heal";
}

function bossDefeat(){
  areas[game.area] = { ...areas[game.area], ...areas[game.area].blocked };// add key value pair
  areas[game.area].travelDesc = areas[game.area].travelDescPostBoss;
  delete areas[game.area].blocked;
  delete areas[game.area].boss;
}

//================================================================================
//
//          travel
//
//================================================================================


function travel(direction){
  game.area = areas[game.area][direction];
}
function teleport(areaName){
  game.area = areaName;
}

//================================================================================
//
//          actions
//
//================================================================================
var actionList = {
  beginningUnlock: function(){
    areas.beginning = { ...areas.beginning, ...areas.beginning.blocked };
    delete areas[game.area].action;
    delete areas.beginning.blocked;
    areas.beginning.travelDesc = "To your west is an entance to an old sewer. There is a shop to you south. The path north is unlocked";
    return "You pull the lever and hear somthing unlock in the distance (at the beginning)";
  }
}

function initiateAction(actionName){
  return actionList[actionName](); 
}


//================================================================================
//
//          helper functions
//
//================================================================================
//
function random(max){
  return Math.floor( Math.random() * max + 1);
}

function weightedRandom(pool){
  let total = 0;
  for(let i in pool){
    total += pool[i][1];
  }
  let rand = random(total);
  let sum = 0;
  for(let i in pool){
    sum += pool[i][1];
    if( rand <= sum ) return pool[i][0]
  }
}

//tests
//post rat you have 112 attack
//pot rat 2 you have 334 attack
function stage2(){
  player.attack.plusser += 62;
}

function aquireAllItems(){
  for(let i in items.accessories){
    aquireItem(i);
  }
  for(let i in items.weapons){
    aquireItem(i);
  }

}

//aquireAllItems();



