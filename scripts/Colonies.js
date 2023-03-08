import { getGovernors, getColonies, setColonyId, getColonyInventory } from "./database.js";

const governors = getGovernors()
const colonies = getColonies()

// setting the placeholder and dropdown values for Governors
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

// Find the matching the colony based on the governor selected in the dropdown
export const findColony = (governorId, colonies) => {
    // Declare 2 variables, one for currentGovernor and one for governorColony
    let currentGovernor = null
    let governorColony = null
    for (const governor of governors) {
        // Iterate through the governors to match the governorId with the governor.id
        if (governor.id === governorId) {
            // assign that governor to the currentGovernor
            currentGovernor = governor
        }
    }
    // Iterate through the colonies to match the colony.id with the currentGovernor.colonyId 
    for (const colony of colonies) {
        if (currentGovernor.colonyId === colony.id) {
            // assign that colony to governorColony
            governorColony = colony
        }
    }

    return governorColony
}

const renderColonyInventory = (currentColonyObj) => {
    const currentColonyInventories = getColonyInventory()
    const inv = currentColonyInventories.filter((inventory) => {
        return currentColonyObj.id === inventory.selectedColony;
    });//Finds and returns an array of objects where the ids are all the same as the selected colony's ID
    let html = ``;
    if(Array.isArray(inv)){
        inv.forEach(inventory => {
            html += `<p>${inventory.selectedColony}</p>`
        })
    }
    else{
        html += `<p>${inv.selectedColony}</p>`
    }
    return html;
}

// setting the event listener for the dropdown for governors
document.addEventListener("change", (event) => {
    // targeting governors
    if (event.target.id === "governor") {
        // parsing the selected value to get the selectedGovernorId
        let selectedGovernorId = parseInt(event.target.value)
        // If the selectedGovernorId is the placeholder (value 0), present placeholder name
        if (selectedGovernorId === 0) {
            document.querySelector("#colony--header").innerHTML = `<h2>Colony Minerals</h2>`
        } else {
            // else assigned currentColony to the function detailed above to get the selected governor's assigned colony
            let currentColony = findColony(selectedGovernorId, colonies)
            setColonyId(currentColony.id)
            // show the current colony's name + Minerals as a header
            document.querySelector("#colony--header").innerHTML = `<h2>${currentColony.name} Minerals</h2>`
            document.querySelector("#colony--inventory").innerHTML = renderColonyInventory(currentColony);
        }
    }
})
