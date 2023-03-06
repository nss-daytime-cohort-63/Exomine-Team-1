//cg mimicked code from Cars 'R Us
import { getGovernors } from "./database.js";
const governors = getGovernors()

// document.addEventListener(
//     "change",
//     (changeEvent) => {
//         if (changeEvent.target.id === "governor") {
//             const chosenOption = changeEvent.target.value
//             setGovernor(parseInt(changeEvent.target.value))
//         }
//     }
// )

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