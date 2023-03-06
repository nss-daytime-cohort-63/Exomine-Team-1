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
        {id:1,name:"vibranium"},
        {id:2,name:"adamantium"},
        {id:3,name:"unobtainium"},
        {id:4,name:"mythril"},
        {id:5,name:"kryptonite"},
        {id:6,name:"Pym particles"}
    ],
    transientState: {}
}

export const setMine = (mineId) => {
    database.transientState.selectedMine = mineId
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

