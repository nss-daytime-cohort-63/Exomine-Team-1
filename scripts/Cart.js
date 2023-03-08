import { addCustomOrder, getColonies, getMines, getMineral, getColonyInventory, getMineInventory, getCurrentOrder } from "./database.js"
const findMineInventory = (mineId) => {
    const mines = getMines()
    const mineInventories = getMineInventory()
    const currentOrder = getCurrentOrder()
    let currentMine = null
    let currentMineInventory = null
    for (const mine of mines) {
        // Iterate through the mines to match the mineId with the mine.id
        if (mine.id === mineId) {
            // assign that mine to the currentMine
            currentMine = mine
            for (const mineInventory of mineInventories) {
                if (currentMine.id === mineInventory.mineId && mineInventory.mineralId === currentOrder.selectedMineral) {
                    currentMineInventory = mineInventory
                }
            }
        }
    }
    return currentMineInventory
}
const findMatchingColonyInventory = (colonyId) => {
    const colonies = getColonies()
    const colonyInventories = getColonyInventory()
    let currentColony = null
    let currentColonyInventory = null
    for (const colony of colonies) {
        if (colonyId === colony.id) {
            // assign that colony to currentColony
            currentColony = colony
            if (colonyInventories.length === 0) {
                addCustomOrder()
                return null
            } else {
                for (const colonyInventory of colonyInventories) {
                    if (currentColony.id === colonyInventory.selectedColony) {
                        currentColonyInventory = colonyInventory
                    }
                    else {
                        addCustomOrder()
                        return null
                    }
                }
            }

        }
    }
    return currentColonyInventory
}

// const findMineral = (mineralId) => {
//     const minerals = getMineral()
//     let currentMineral = null
//     for (const mineral of minerals) {
//         if (mineralId === mineral.id) {
//             // assign that mineral to currentMineral
//             currentMineral = mineral
//         }
//     }

//     return currentMineral
// }

export const cartUpdate = () => {
    let currentOrder = getCurrentOrder()
    let currentMineId = currentOrder.selectedMine
    let currentMineralId = currentOrder.selectedMineral
    let mines = getMines()
    let minerals = getMineral()
    let currentMine = null
    let currentMineral = null

    for (let mine of mines) {
        if (mine.id === currentMineId) {
            currentMine = mine.name
        }
    }
    
    for (let mineral of minerals) {
        if (mineral.id === currentMineralId) {
            currentMineral = mineral.name
        }
    }

    return `<p>1 ton of ${currentMineral} from ${currentMine}</p>`
}

export const purchaseButton = () => {
    document.addEventListener(
        "click", (clickEvent) => {
            const itemClicked = clickEvent.target
            const currentOrder = getCurrentOrder()
            if (itemClicked.id.startsWith("purchase")) {
                let seller = findMineInventory(currentOrder.selectedMine)
                let buyer = findMatchingColonyInventory(currentOrder.selectedColony)
                // let product = findMineral(currentOrder.selectedMineral)
                if (buyer === null) {
                    seller.quantity = seller.quantity - 1
                } else {
                    buyer.quantity+=1
                    seller.quantity = seller.quantity - 1
                }
            }
        }
    )
}
