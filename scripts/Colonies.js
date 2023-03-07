import { getGovernors, getColonies } from "./database.js";

const governors = getGovernors()
const colonies = getColonies()

export const Governors = () => {
    let html = ""
    html += `<select id="governor">
        <option value="0">Choose a governor</option>`
    for (const governor of governors) {
        if (governor.isActive === true) {
            html += `<option value="${governor.id}">${governor.name}</option>`
        }
    }
    html += `</select>`
    return html
}

// issue #4 - update colony name (heading) based on governor selected
export const findColony = (governorId, colonies) => {
    let governorColony = null
    let currentGovernor = null
    for (const governor of governors) {
        if (governor.id === governorId) {
            currentGovernor = governor
        }
        
    }
    for (const colony of colonies) {
        if (currentGovernor.colonyId === colony.id) {
            governorColony = colony
        }
    }

    return governorColony
}

document.addEventListener("change", (event) => {

    if (event.target.id === "governor") {

        let selectedGovernorId = parseInt(event.target.value)
        
        if (selectedGovernorId === 0) {
            document.querySelector("#colony--header").innerHTML = `<h2>Colony Minerals</h2>`
        } else {
            let currentColony = findColony(selectedGovernorId, colonies)   
                
                    document.querySelector("#colony--header").innerHTML = `<h2>${currentColony.name} Minerals</h2>`

                
            
        }
    }
})
