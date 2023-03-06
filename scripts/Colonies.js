//cg mimicked code from Cars 'R Us
// need setGovernor on database.js
import { getGovernors  } from "./database.js";
const governors = getGovernors()

export const Governors = () => {

}


// document.addEventListener(
//     "change",
//     (changeEvent) => {
//         if (changeEvent.target.id === "governor") {
//             const chosenOption = changeEvent.target.value
//             setGovernor(parseInt(changeEvent.target.value))
//         }
//     }
// )

// export const Governors = () => {
//     let html = ""
//     html += `<select id="governor">
//         <option value="0">Choose a governor</option>`
//     for (const governor of governors) {
//         if (governor.isActive === true) {
//             html += `<option value="${governor.id}">${governor.name}</option>`
//         }
//     }
//     html += `</select>`

//     return html
// }

// // issue #4 - update colony name (heading) based on governor selected
// // need to import on 
// export const findColony = (governor, allColonies) => {
//     let governorColony = null
//     let html = ""

//     for (const colony of allColonies) {
//         if (colony.id === governor.colonyId) {
//             governorColony = colony
//         }
//     }

//     return html += `<h2>${governorColony} Minerals</h2>`
// }