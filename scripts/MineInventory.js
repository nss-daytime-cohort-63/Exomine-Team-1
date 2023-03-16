import { cartUpdate } from "./Cart.js";
import { getMineInventory, getMineral, setMineral } from "./database.js";
const minerals = getMineral()
const mineInventory = getMineInventory()

export const MineInventory = (currentMine)=>{
//take the mine ID as an argument and use a loop to match it to it's mineInventory. take the matched inventory and loop minerals to match that to the matched inventory
//collect the results as a string of html containing both the name of the matched mineral and the quantity. repeat if there are multiple matching minerals. return as html string
    let html = `<ul class="facility__inventory">`
    for(const inventory of mineInventory){
        if(inventory.mineId === currentMine){
            for(const mineral of minerals){
                if(mineral.id === inventory.mineralId){
                    if(inventory.quantity > 0){
                        html += `<li class="facility__mineral">
                        <input type="radio" name="mineral" value="${mineral.id}"/> ${inventory.quantity} tons of ${mineral.name}
                            </li>`
                        }
                }
            }
        }
    }
    html += "</ul>"
    return html
}
document.addEventListener("change", (event) => {
    
    if (event.target.name === "mineral") {
      //Parsing selected value to get the current mineralId
      let selectedMineralId = parseInt(event.target.value)
      //Setting the temporary storage to have the matching mineralId
      setMineral(selectedMineralId)
      document.querySelector('#cart--inventory').innerHTML = cartUpdate()
    }
})