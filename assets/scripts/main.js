
$(document).ready(function(){
  $(".hidden").hide().removeClass("hidden"); //preserve class to stop flicker hack
//======================================================================================
//
//             menus
//
//======================================================================================
  var mainMenuStates ={
    mainMenu: function(){
      $("#main-menu").show();
      $("#inventory").hide();
      $("#main-menu-button").attr({"disabled": true});
      $("#inventory-button").attr({"disabled": false});
    },
    inventory: function(){
      $("#inventory").show();
      $("#main-menu").hide();
      $("#main-menu-button").attr({"disabled": false});
      $("#inventory-button").attr({"disabled": true});
    }
  }
  $("#main-menu-button").on("click", function(e){
    e.preventDefault();
    mainMenuStates.mainMenu();
  });
  $("#inventory-button").on("click", function(e){
    e.preventDefault();
    mainMenuStates.inventory();
  });

  var menuStates ={
    idle: function(){
      $("#menu-1").show();
      $("#directions").show();
      $("#fight-menu").hide();
    },
    fighting: function(){
      $("#directions").hide();
      $("#menu-1").hide();
      $("#fight-menu").show();
      $("#end-fight").show();
      $("#fight-again").hide();
      $("#go-back").hide();
    },
    fightOver: function(){
      //$("#menu-1").hide();      ====redundant
      //$("#fight-menu").show();  ====these are always implicit
      $("#end-fight").hide();
      $("#fight-again").show();
      $("#go-back").show();
    },
    traveling: function(){ //this may be redundant now but l8r may be used
      $("#menu-1").hide();
      $("#directions").hide();
    }

  }

  var areaStatesUI = {
    north: function(){
      $("#travel-north").show();
    },
    east: function(){
      $("#travel-east").show();
    },
    south: function(){
      $("#travel-south").show();
    },
    west: function(){
      $("#travel-west").show();
    },
    hasFight: function(){
      $("#fight").show();
    },
    boss: function(){
      $("#fight-boss").text(`Fight BOSS: ${areas[game.area].boss.name}`).show();
    },
    action: function(){
      $("#action").text(areas[game.area].action.name).show();
    },
    shop: function(){
      $("#shop").show();
    },    
    clearTravel: function(){
      $("#travel-north, #travel-east, #travel-south, #travel-west, #fight, #fight-boss, #shop, #action").hide();
    }
  }

//======================================================================================
//
//             increments
//
//======================================================================================

  setInterval(function(){
    game.ticks++; //every 10th of a second

    if (game.ticks % 10 === 0){ //every second
      goldIncrement();
      fightIncrement();
      healthIncrement();
      healthyUI();
    }
  }, game.tickspeed);

  function goldIncrement(){
    resources.gold.value += resources.gold.increment;
    $("#gold").text(resources.gold.value);
  }

  function fightIncrement(){
    if (game.state === "fighting"){
      fight();
      $("#player-hp").text(player.hp.value);
      $("#enemy-hp").text(fightState.enemy.hp.value);
      log(fightState.fightMessage);
    } else if (game.state === "fightOver"){
      fightOver();
      if(fightState.playerWin === true){
        updateInventory();
        updateStatus();
        if (fightState.fightingBoss === false){
          menuStates.fightOver();
        } else {
          updateAreaUI();
          markPath();
          menuStates.idle();
        }
      } else { //player lose
        console.log("loss")
        menuStates.idle();
        updateStatus();
        return
      }
      log(fightState.fightMessage);
    }
  }

  function healthIncrement(){
    if (game.state === "idle" && player.hp.value < player.hp.max && areas[game.area].safe){
      player.hp.value += player.hp.idleIncrement;
      if (player.hp.value > player.hp.max){
        player.hp.value = player.hp.max;
      }
      $("#player-hp").text(player.hp.value)
    }
  }

  function healthyUI(){
    if (player.hp.value < player.hp.healthyAt){
      return false;
    } else {
      return true;
    }
  }

//======================================================================================
//
//             travelling
//
//======================================================================================

  function travelUI(direction){
    $(`#travel-${direction}`).on('click', function(e){
      e.preventDefault();
      mainMenuStates.mainMenu();
      unMarkArea();
      menuStates.traveling();
      travel(direction);
      log(`You travel ${direction} to ${areas[game.area].name}.`);
      updateAreaUI();
      updateShopUI();
      if (direction === "north"){
        game.coord[1] -= 2;
      } else if (direction === "east"){
        game.coord[0] += 2;
      } else if (direction === "south"){
        game.coord[1] += 2;
      } else{
        game.coord[0] -= 2;
      }
      if(areas[game.area].safe){
        game.lastSafePlace = game.area;
        game.lastSafePlaceCoord = areas[game.area].coord;
      }
      markPath();
      markArea();
      menuStates.idle();
    });
  }
  function updateAreaUI(){
    $("#area-name").text(areas[game.area].name);
    $("#desc").text(areas[game.area].desc);
    $("#travel-desc").text(areas[game.area].travelDesc);
    areaStatesUI.clearTravel();
    ["north", "east", "south", "west", "hasFight", "boss", "shop", "action"].forEach( i => {
      if (areas[game.area].hasOwnProperty(i)){
        areaStatesUI[i]();
      }
    });
  }
  function updateShopUI(){
    let shopList = Object.keys(shops);
    shopList.forEach( e=>{
      if (e === game.area){
        $(`#${e}-UI`).show();
      } else {
        $(`#${e}-UI`).hide();
      }
    });
  }

  travelUI("north");
  travelUI("east");
  travelUI("south");
  travelUI("west");

//======================================================================================
//
//             fighting
//
//======================================================================================

  $("#fight").add("#fight-again").add("#fight-boss").on("click", function(e){
    e.preventDefault();
    if (!healthyUI()){
      log("You are too weak to fight!")
      return
    }
    if(this.id === "fight-boss"){
      fightState.fightingBoss = true;
    } else{
      fightState.fightingBoss = false;
    }
    fightUI()
    menuStates.fighting();
  });

  function fightUI(){
    game.state = "fighting";
    initiateFight();
    log(fightState.fightMessage);
    $("#current-enemy").text(fightState.enemy.name);
    $("#enemy-hp").text(fightState.enemy.hp.value);
    $("#enemy-attack").text(fightState.enemy.attack);
  }

  $("#go-back").on("click", function(e){
    e.preventDefault();
    menuStates.idle();
  });


/* Too many bugs - need a new build to sort
  $("#end-fight").on("dblclick", function(e){
    e.preventDefault();
    player.hp.value = 1;
    log("You give up, waiting for the enemy to do it's killing blow.")
  });*/

//======================================================================================
//
//             shop
//
//======================================================================================
  var itemIdList = []; //item, shop, id, class, itemname

  function createShopWeapon(itemName, shop){
    let item = items.weapons[itemName];
    let id = `${itemName}-${shop}`;
    let price = shops[shop][itemName].price;
    let buttonHTML = `${item.name} <span><button type="button" class="${itemName}-button" id="${id}">Buy</button><span>£${price}</span></span>`
    id = "#" + id;
    itemIdList.push([itemName, shop, id, `.${itemName}-button`, item.name]);
    return buttonHTML;
  }
  function createShopAccessory(itemName, shop){
    let item = items.accessories[itemName];
    let id = `${itemName}-${shop}`;
    let price = shops[shop][itemName].price;
    let buttonHTML = `${item.name} <span><button type="button" class="${itemName}-button" id="${id}">Buy</button><span>£${price}</span></span>`
    id = "#" + id;
    itemIdList.push([itemName,shop, id, `.${itemName}-button`, item.name]);
    return buttonHTML;
  }
  function createShop(shopName){
    let weapons = listShopWeapons(shopName);
    let weaponsHTML = "";
    for (let i = 0; i < weapons.length; i++){
      weaponsHTML += `\t\t<p>${createShopWeapon(weapons[i][0], shopName)}</p>\n`
    }
    let accessories = listShopAccessories(shopName);
    let accessoriesHTML = "";
    for (let i = 0; i < accessories.length; i++){
      accessoriesHTML += `\t\t<p>${createShopAccessory(accessories[i][0], shopName)}</p>\n`
    }  
    return `<div><h2>Weapons:</h2>\n${weaponsHTML}</div>\t<div><h2>Accessories:</h2>\n${accessoriesHTML}</div>`
  }
  function createAllShops(){
    let allShops = "";
    let shopList = Object.keys(shops);
    for (let i = 0; i< shopList.length; i++){
      allShops += `<div class="shop" id="${shopList[i]}-UI">\n\t${createShop(shopList[i])}</div>`
    }
    return allShops;
  }
  $("#shop").html(createAllShops());
  itemIdList.forEach( x => {
    $(x[2]).on("click", function(e){
      if ( buy(x[0],x[1]) ){
        log(`${capFirst(x[4])} bought.`);
        $(x[3]).attr({"disabled": true}).siblings().text("SOLD OUT");
        updateInventory();
      } else {
        log(`You don't have the money to buy ${x[4]}`)
      }
    });
  });


//======================================================================================
//
//             inventory
//
//======================================================================================
  function updateInventory(){
    let weaponsList = "";
    let weaponsSelect = ""
    //let equippedWeapon = equipped.weapon;
    inventory.weapons.forEach( function(item){
      let isEquipped = equipped.weapon === item;

      weaponsList +=`<p style=${isEquipped ? "font-weight:bold;" : "font-weight:normal;"}>${items.weapons[item].name}:  ${items.weapons[item].desc}</p>`;
      weaponsSelect += `<option value="${item}" ${isEquipped ? "selected" : ""} >${items.weapons[item].name}</option>`
    });
    $("#equip-weapon-select").html(weaponsSelect);

    $("#weapons").html(weaponsList);
    let accessoriesList = "";
    inventory.accessories.forEach( function(item){
      accessoriesList +=`<p>${items.accessories[item].name}:  ${items.accessories[item].desc}</p>`;
    });
    $("#accessories").html(accessoriesList);
    updateStatus()
  }
  

  $("#equip-weapon-select").on("change", function(e){
    equipWeapon(this.value);
    log(`Equipped ${items.weapons[this.value].name}`)
    updateInventory()
    updateStatus()
  })

  updateInventory();
//======================================================================================
//
//             action
//
//======================================================================================
  $("#action").on("click", function(e){
    e.preventDefault();
    let actionName = areas[game.area].action.effect;
    log( initiateAction(actionName) );
    if(!areas[game.area].hasOwnProperty(areas[game.area].action) ){
      $(this).hide();
    }
  });




//======================================================================================
//
//             messages
//
//======================================================================================


  function log(text){
    text = $("<p></p>").text(text);
    $("#log").prepend(text);
    if( $("#log").children().length > 4) {
      $("#log").children().last().remove();
    }
    $("#log").children().slice(1).css({"color": "#aaa"});
  }

  //UI helpers
  function updateStatus(){
    $("#player-hp").text(player.hp.value);
    $("#player-hp-max").text(player.hp.max);
    $("#player-attack").text(player.attack.value);
    $("#gold-increment").text(`(${resources.gold.increment} gold per sec)`)
  }


  function capFirst(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
//======================================================================================
//
//             map
//
//======================================================================================
  for(let y = 0; y < 50; y++){
    for(let x = 0; x < 20; x++)
      $(`<div id="${x}-${y}">${weightedRandom(
       [[" ", 2000],["'",50],[".;",10],["^^",10],["/\\", 10],["..",30],[".",50],["l ",2],["j",2]])
      }</div>`).appendTo("#map");
  }
  function markPathCoord(x, y, symbol){
    $(`#${x}-${y}`).text(symbol);
  }
  function markArea(){
    let x = game.coord[0];
    let y = game.coord[1];
    $(`#${x}-${y}`).addClass('marked');
  }
  function unMarkArea(){
    let x = game.coord[0];
    let y = game.coord[1];
    $(`#${x}-${y}`).removeClass('marked');
  }
  function markPath(){
    let x = game.coord[0];
    let y = game.coord[1];
    if (areas[game.area].hasOwnProperty("shop")){
      markPathCoord(x, y, "($)")
    } else if (areas[game.area].safe === true){
      markPathCoord(x, y, "(∞)")
    } else if (areas[game.area].hasFight === true){
      markPathCoord(x, y, "(!)")
    } else {
      markPathCoord(x, y, "(-)")
    }

    if (areas[game.area].hasOwnProperty("north")){
      markPathCoord(x, y - 1, "|")
    }
    if (areas[game.area].hasOwnProperty("south")){
      markPathCoord(x, y + 1, "|");
    }
    if (areas[game.area].hasOwnProperty("east")){
      markPathCoord(x + 1, y, "---")
    }
    if (areas[game.area].hasOwnProperty("west")){
      markPathCoord(x -1, y, "---")
    }

  }
  markPath();
  markArea();
//======================================================================================
//
//             dev mode
//
//======================================================================================
  $("#increase-attack").on("click", function(){
    player.attack.plusser += 50;
    updateAttack();
    updateStatus();
  });
  $("#decrease-attack").on("click", function(){
    player.attack.plusser -= 50;
    updateAttack();
    updateStatus();
  });
  $("#max-health").on("click", function(){
    player.hp.value = player.hp.max;
    updateStatus();
  });
  $("#double-money").on("click", function(){
    resources.gold.value *= 2;
    $("#gold").text(resources.gold.value);
  });
  $("#aquire-all-items").on("click", function(){
    aquireAllItems();
    updateAttack();
    updateStatus();
    updateInventory();
    $("#gold").text(resources.gold.value);
  });

});


