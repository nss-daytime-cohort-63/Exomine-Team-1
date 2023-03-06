const database = {
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
        { id: 1, name: "Europa Minerals" },
        { id: 2, name: "Colony Minerals" },
        { id: 3, name: "Mars Minerals" }
    ],
    colonyInventory: [
        {  

        }
    ],
    transientState: {}
}

export const setFacility = (facilityId) => {
    database.transientState.selectedFacility = facilityId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}

export const getFacilities = () => {
    return database.facilities.map(f => ({...f}))
}

export const purchaseMineral = () => {

        // Broadcast custom event to entire documement so that the
        // application can re-render and update state
        document.dispatchEvent( new CustomEvent("stateChanged") )
    }
}
