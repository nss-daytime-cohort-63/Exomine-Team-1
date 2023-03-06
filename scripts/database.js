const database = {
    mines: [
        {id:1,name:"Crazy Vaclav's House of Adamantium", isActive:true},
        {id:2,name:"Unobtainium Emporium", isActive:true},
        {id:3,name:"You Rock Mining Corp", isActive:true},
        {id:4,name:"Can You Dig it Mine", isActive:true},
        {id:5,name:"Super Happy Fun Mining for Happy Workers and Not Slaves", isActive:false}
    ],
    mineInventory:[
        {}
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
    colonyInventory: [
        {  

        }
    ],
    currentOrder: {}
}

export const setMine = (mineId) => {
    database.currentOrder.selectedMine = mineId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}

export const getMines = () => {
    return database.mines.map(mine => ({...mine}))
}
export const getMineral = () => {
    return database.minerals.map(mineral => ({...mineral}))
}

export const purchaseMineral = () => {

        // Broadcast custom event to entire documement so that the
        // application can re-render and update state
        document.dispatchEvent( new CustomEvent("stateChanged") )
    }

