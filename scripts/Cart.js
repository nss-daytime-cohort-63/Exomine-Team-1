import {
  addCustomOrder,
  getColonies,
  getMines,
  getMineral,
  getColonyInventory,
  getMineInventory,
  getCurrentOrder,
} from "./database.js";
import { renderColonyInventory } from "./Colonies.js";
import { MineInventory } from "./MineInventory.js";
//Getters Initializing
const mines = getMines();
const colonies = getColonies();
const minerals = getMineral();

const findMineInventory = (mineId) => {
  const currentOrder = getCurrentOrder();
  const mineInventories = getMineInventory();
  let currentMine = null;
  let currentMineInventory = null;
  for (const mine of mines) {
    // Iterate through the mines to match the mineId with the mine.id
    if (mine.id === mineId) {
      // assign that mine to the currentMine
      currentMine = mine;
      for (const mineInventory of mineInventories) {
        if (
          currentMine.id === mineInventory.mineId &&
          mineInventory.mineralId === currentOrder.selectedMineral
        ) {
            console.log(currentOrder.selectedMineral)
          currentMineInventory = mineInventory;
        }
      }
    }
  }
  return currentMineInventory;
};

let currentColony = null; //moved to modular scope
const findMatchingColonyInventory = (colonyId, mineInventory) => {
  const colonyInventories = getColonyInventory();
  const currentOrder = getCurrentOrder();
  let currentColonyInventory = null;
  for (const colony of colonies) {
    if (colonyId === colony.id) {
      // assign that colony to currentColony
      currentColony = colony;

      //Check if the inventoryies have any past purchases, if not add a custom order.
      if (colonyInventories.length === 0) {
        addCustomOrder();
        return null;
      } 

      
      let check = false 
    //Loop through the inventories, if the colony matches, the active mineral matches the past selection, and the inventory mineral matches the active selection
    //If so set the passed out entry to the current inventory match
    //set the check to true, in that we found a match.
      for (const colonyInventory of colonyInventories) {
        if (currentColony.id === colonyInventory.selectedColony&&
          mineInventory.mineralId === currentOrder.selectedMineral && 
          colonyInventory.selectedMineral === currentOrder.selectedMineral) {
          currentColonyInventory = colonyInventory;
          check = true
        }
    }
    //If we did not find a match, add a new order.
    if(check != true){
        addCustomOrder();
        return null;
    }
    }
  }
  return currentColonyInventory;
};

let currentMineId = 0;
export const cartUpdate = () => {
  const currentOrder = getCurrentOrder();
  let currentMineId = currentOrder.selectedMine;
  let currentMineralId = currentOrder.selectedMineral;

  let currentMine = null;
  let currentMineral = null;
  for (let mine of mines) {
    if (mine.id === currentMineId) {
      currentMine = mine.name;
    }
  }

  for (let mineral of minerals) {
    if (mineral.id === currentMineralId) {
      currentMineral = mineral.name;
    }
  }

  return `<p>1 ton of ${currentMineral} from\n ${currentMine}</p>`;
};

export const purchaseButton = () => {
  document.addEventListener("click", (clickEvent) => {
    const colonyInventories = getColonyInventory();
    const itemClicked = clickEvent.target;
    const currentOrder = getCurrentOrder();
    if (itemClicked.id.startsWith("purchase")) {
      console.log(colonyInventories);
      let seller = findMineInventory(currentOrder.selectedMine);
      let buyer = findMatchingColonyInventory(currentOrder.selectedColony, seller);

      // let product = findMineral(currentOrder.selectedMineral)
      if (seller.quantity === 0) {
        window.alert("Item is out of stock"); //When this line is reached, it doesn't actually stop an order from placing.
      } else {
        if (buyer === null) {
          seller.quantity = seller.quantity - 1;
        } else {
          buyer.quantity += 1;
          seller.quantity = seller.quantity - 1;
        }
      }
      document.querySelector("#colony--inventory").innerHTML =
        renderColonyInventory(currentColony);
      document.querySelector("#mine--inventoryDisplay").innerHTML =
        MineInventory(currentOrder.selectedMine);
    }
  });
};
