import { getGovernors, getColonies, setColonyId, getColonyInventory, getMineral } from "./database.js";

const governors = getGovernors()
const colonies = getColonies()
const minerals = getMineral()

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



export const renderColonyInventory = (currentColonyObj) => {
    const currentColonyInventories = getColonyInventory()//We grab the database.colonyInventory
    const inv = currentColonyInventories.filter((inventory) => {//Filter it on another line and assign that to "inv"
        return currentColonyObj.id === inventory.selectedColony;//Filter returns array of obj that pass conditional check
    });//Finds and returns an array of objects where the ids are all the same as the selected colony's ID
    let html = ``;//Initialize an empty string for putting html into for future rendering
    let jankArray = [];//I hate this. Because of a fun little bug, this holds spam I generate which represents the amount of 
    //orders generated for the specific colony we want to display. We use it to get the amount of tons of a mineral,
    //since each order only holds 1 at the moment anyway.
    /*
        We need to figure out a way to sort by mineral ids and then grab the amount from everything that filter returns
        and add that together, then generate a piece of html to represent that

        This solution may just net me a nobel prize. It makes me wish I'd net a beer.

        Almost none of this would be necessary if the code that pushes orders actually made the checks to increment the amounts
        like they're supposed to. lol. May be my fault, though. I can't be bothered to change it now, or figure out why.
    */
    inv.forEach(order => {//We go through every listing in the already colony-filtered list
        const currentMineral = minerals[order.selectedMineral - 1];//Set the current mineral so we can display it
        jankArray.push(`<p class="${currentMineral.name}">`)//We push p strings for every item in the filtered array
    })
    //Below we initialize the amounts of each possible element.
    let mythrilAmount = 0;
    let vibraniumAmount = 0;
    let adamantiumAmount = 0;
    let unobtainiumAmount = 0;
    let kryptoniteAmount = 0;
    let pymAmount = 0;
    //for-each on jankArray, responsible for setting the amount of each element by checking each p string
    jankArray.forEach(p =>{
        if(p.startsWith(`<p class="Mythril">`)){//Best element
            mythrilAmount++;
        }else if(p.startsWith(`<p class="Vibranium">`)){
            vibraniumAmount++;
        }else if(p.startsWith(`<p class="Adamantium">`)){//Close second
            adamantiumAmount++;
        }else if(p.startsWith(`<p class="Unobtainium">`)){
            unobtainiumAmount++;
        }else if(p.startsWith(`<p class="Kryptonite">`)){
            kryptoniteAmount++;
        }else if(p.startsWith(`<p class="Pym particles">`)){
            pymAmount++;
        }
    })//end of for-each

    //Several if statements which add the appropiate HTML to the html string, pulls the above-set amounts
    //Each one has a class that can be styled. Stretch goal could give each element a colony owns it's own vibe
    /*Note - currently, the HTML will render elements in this order, every time. If you bought Pym Particles, and then
    decide next you want to buy Adamantium, it will place Adamantium above Pym particles, regardless of amount.
    */
        if(mythrilAmount != 0){
            html+= `<p class="Mythril">${mythrilAmount} tons of Mythril.`;
        }
        if(vibraniumAmount != 0){
            html+= `<p class="Vibranium">${vibraniumAmount} tons of Vibranium.`;
        }
        if(adamantiumAmount != 0){
            html+= `<p class="Adamantium">${adamantiumAmount} tons of Adamantium.`;
        }
        if(unobtainiumAmount != 0){
            html+= `<p class="Unobtanium">${unobtainiumAmount} tons of Unobtainium.`;
        }
        if(kryptoniteAmount != 0){
            html+= `<p class="Kryptonite">${kryptoniteAmount} tons of Kryptonite.`;
        }
        if(pymAmount != 0){
            html+= `<p class="Pym particles">${pymAmount} tons of Pym particles.`;
        }
    return html;//We may now return the HTML, as it awaits rendering. :)
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
