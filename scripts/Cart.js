import{ addCustomOrder, getColonies, getMines, getMineral} from "./database.js"
const findMine = (mineId) => {
    const mines = getMines()
    let currentMine = null
    for (const mine of mines) {
        // Iterate through the mines to match the mineId with the mine.id
        if (mine.id === mineId) {
            // assign that mine to the currentMine
            currentMine = mine
        }
    }
    return currentMine
}
const findColony = (colonyId) =>{
    const colonies = getColonies()
    let currentColony = null
    for (const colony of colonies) {
        if (colonyId === colony.id) {
            // assign that colony to currentColony
            currentColony = colony
        }
    }
    return currentColony
}

const findMineral = (mineralId) => {
    const minerals = getMineral()
    let currentMineral = null
    for (const mineral of minerals) {
        if (mineralId === mineral.id) {
            // assign that mineral to currentMineral
            currentMineral = mineral
        }
    }

    return currentMineral
}

export const purchaseButton = () => {document.addEventListener(
    "click", (clickEvent) => {  
        const itemClicked = clickEvent.target      
        if (itemClicked.id.startsWith("purchase")){
            addCustomOrder()
        }
    }
)  }