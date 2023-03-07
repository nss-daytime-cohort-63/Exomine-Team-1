import { getMines, setMine } from "./database.js";
import { MineInventory } from "./MineInventory.js";{}

let mines = getMines();

export const Mines = () => {
  let html = "";
  html += `<select id="facility">
        <option value="0">Choose a facility</option>`;
  for (const mine of mines) {
    if (mine.isActive === true) {
      html += `<option value="${mine.id}">${mine.name}</option>`;
    }
  }
  html += `</select>`;
  return html;
};


document.addEventListener("change", (event) => {
    
  if (event.target.id === "facility") {
    //Parsing selected value to get the current mineId
    let selectedMineId = parseInt(event.target.value)
    //Setting the temporary storage to have the matching mineId
    setMine(selectedMineId)
    
    //If the selectedMineId is not an actual option, present default name
    if(selectedMineId === 0){
        document.querySelector("#mine--header").innerHTML = `<h2>Facility Minerals</h2> `
        document.querySelector("#mine--inventoryDisplay").innerHTML=""
    }else{
      document.querySelector("#mine--inventoryDisplay").innerHTML=MineInventory(selectedMineId)
    }

    //Loop through mines, if the value matches the id of a mine, update to show it's mineral content
    for (let mine of mines){
        if(mine.id === selectedMineId){
            document.querySelector("#mine--header").innerHTML = `<h2>Facility Minerals for ${mine.name}</h2> `
        }
    }
    }
    
  }
);

