import { getMineInventory, getMineral } from "./database.js";
const minerals = getMineral()
const mineInventory = getMineInventory()

export const MineInventory = (currentMine)=>{
//take the mine ID as an argument and use a loop to match it to it's mineInventory. take the matched inventory and loop minerals to match that to the matched inventory
//collect the results as a string of html containing both the name of the matched mineral and the quantity. repeat if there are multiple matching minerals. return as html string
    let html = `<ul>`
    for(const inventory of mineInventory){
        if(inventory.mineId === currentMine){
            for(const mineral of minerals){
                if(mineral.id === inventory.mineralId){
                    html += `<li>
                        <input type="radio" name="mineral" value="${mineral.id}"/> ${inventory.quantity} tons of ${mineral.name}
                            </li>`
                }
            }
        }
    }
    html += "</ul>"
    return html
}