import { getMines } from "./database.js";

let mines = getMines();

export const Mines = () => {
    let html = ""
    html += `<select id="facility">
        <option value="0">Choose a facility</option>`
    for (const mine of mines) {
        if (mine.isActive === true) {
            html += `<option value="${mine.id}">${mine.name}</option>`
        }
    }
    html += `</select>`
    return html
}