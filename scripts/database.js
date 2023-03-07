const database = {
    mines: [
        {id:1,name:"Crazy Vaclav's House of Adamantium", isActive:true},
        {id:2,name:"Unobtainium Emporium", isActive:true},
        {id:3,name:"You Rock Mining Corp", isActive:true},
        {id:4,name:"Can You Dig it Mine", isActive:true},
        {id:5,name:"Super Happy Fun Mining for Happy Workers and Not Slaves", isActive:false}
    ],
    mineInventory:[
        {id:1,mineId:1,mineralId:2,quantity:208},
        {id:2,mineId:1,mineralId:1,quantity:5},
        {id:3,mineId:2,mineralId:3,quantity:102},
        {id:4,mineId:2,mineralId:5,quantity:25},
        {id:5,mineId:3,mineralId:4,quantity:44},
        {id:6,mineId:3,mineralId:5,quantity:12},
        {id:7,mineId:3,mineralId:6,quantity:4},
        {id:8,mineId:3,mineralId:1,quantity:16},
        {id:9,mineId:4,mineralId:6,quantity:53},
        {id:10,mineId:4,mineralId:3,quantity:7},
        {id:11,mineId:4,mineralId:5,quantity:14},
        {id:12,mineId:5,mineralId:2,quantity:26},
        {id:13,mineId:5,mineralId:3,quantity:43},
    ],
    minerals:[
        {id:1,name:"Vibranium"},
        {id:2,name:"Adamantium"},
        {id:3,name:"Unobtainium"},
        {id:4,name:"Mythril"},
        {id:5,name:"Kryptonite"},
        {id:6,name:"Pym particles"}
    ],
    // cg's objects for governors, colonies, and empty colony inventory
    governors: [
        { id: 1, name: "Nic Lahde", colonyId: 1, isActive: true },
        { id: 2, name: "Jason Harris", colonyId: 3, isActive: true },
        { id: 3, name: "Alex Bishop", colonyId: 2, isActive: true },
        { id: 4, name: "Cullen Ruscin", colonyId: 1, isActive: false },
        { id: 5, name: "Courtney Gulledge", colonyId: 2, isActive: true },
        { id: 6, name: "Josh Barton", colonyId: 3, isActive: true },
        { id: 7, name: "Caroline Madison", colonyId: 2, isActive: false },
        { id: 8, name: "Jeremy Myers", colonyId: 1, isActive: false }
    ],
    colonies: [
        { id: 1, name: "Europa" },
        { id: 2, name: "Earth" },
        { id: 3, name: "Mars" }
    ],
    colonyInventory: [],
    currentOrder: {}
}
// cg's getters for governors and colonies
export const getGovernors = () => {
    return database.governors.map(governor => ({...governor}))
}

export const getColonies = () => {
    return database.colonies.map(colony => ({...colony}))
}

export const setMine = (mineId) => {
    database.currentOrder.selectedMine = mineId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}
export const setMineral = (mineralId) => {
    database.currentOrder.selectedMineral = mineralId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}
export const setColonyId = (colonyId) => {
    database.currentOrder.selectedColony = colonyId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}
export const setMineInventoryId = (mineInvId) => {
    database.currentOrder.selectedMineInventory = mineInvId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}

export const addCustomOrder = () => {
    // Copy the current state of user choices
    const newOrder = {...database.currentOrder}

    // Add a new primary key to the object
    if(database.colonyInventory.length === 0){
        newOrder.id = 1
    } else{
        const lastIndex = database.colonyInventory.length - 1
        newOrder.id = database.colonyInventory[lastIndex].id + 1
    
    }
    newOrder.quantity = 1
    // Add the new order object to custom orders state
    database.colonyInventory.push(newOrder)

    // Reset the temporary state for user choices
    database.currentOrder = {}

    // Broadcast a notification that permanent state has changed
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getMines = () => {
    return database.mines.map(mine => ({...mine}))
}
export const getMineral = () => {
    return database.minerals.map(mineral => ({...mineral}))
}
export const getMineInventory = () => {
    return database.mineInventory.map(mineInventory => ({...mineInventory}))
}
export const purchaseMineral = () => {

        // Broadcast custom event to entire documement so that the
        // application can re-render and update state
        document.dispatchEvent( new CustomEvent("stateChanged") )
    }

