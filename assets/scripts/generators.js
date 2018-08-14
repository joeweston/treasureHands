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
function randomItem(s, power){
  let randomTiny = random(power*10)/50;
  let randomSmall = random(Math.floor(power*4));
  let randomMed = random(Math.floor(power*20));
  let randomLarge = random(Math.floor(power*50));
  let gold = `()=>{resources.gold.increment+=${randomSmall};}, desc:"GPS up ${randomSmall}"`
  let goldMaxHp = `()=>{resources.gold.increment+=${randomSmall};player.hp.max += random(20);}, desc:"GPS up ${randomSmall} and max HP up"`
  let attackRaw = `()=>{player.attack.plusser+=${randomLarge};updateAttack();}, desc:"Raw Attack up ${randomLarge}"`
  let attackMulti = `()=>{player.attack.multiplier+=${randomTiny};updateAttack();}, desc:"Attack multi up ${randomTiny}"`
  let attackBase = `()=>{player.attack.base+=${randomMed};updateAttack();}, desc:"Attack base up ${randomMed}"`
  let effect = weightedRandom([ [ gold, 1],[goldMaxHp, 1], [attackRaw, 1], [attackMulti, 1], [attackBase,1 ] ])
  return `${s}: {name: "${s.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}", effect:${effect}},`
}
//gunk : { name: "gunk", hp: { value: 350, max: 350},    attack: 1, goldDrops: [ [0, 50], [50, 70] ], itemDrops: [ [false, 20],["gunkMedal", 1000], ["woodenBlock", 1], ["lostCandy", 2] ]},
function randomEnemy(s, attack, hp, gold){
  let item1Key = s + "Medal";
  let item1 = randomItem(item1Key, 1);
  let item2Key = s + "Trophy";
  let item2 = randomItem(item2Key, 1.3);
  let item3Key = s + "Idol";
  let item3 = randomItem(item3Key, 1.7);
  let gold1 = random(100) + gold;
  let randomAttack= random(10) + attack;
  let randomHP = random(300) + hp;
  return `${s}: {name: "${s.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}", hp: { value: ${randomHP}, max: ${randomHP}},    attack: ${randomAttack}, goldDrops: [ [0, 50], [${gold1}, 70] ], itemDrops: [ [false, 20],["${item1Key}", 1000], ["${item2Key}", 7], ["${item3Key}", 2] ]}, \n${item1}\n${item2}\n${item3}`
}

console.log(randomEnemy("maggot", 0, 0, 0));




