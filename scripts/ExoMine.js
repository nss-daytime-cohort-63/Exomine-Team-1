import { Mines } from "./MiningFacilities.js";
import { Governors } from "./Colonies.js";

//Query the document and find the container ID
export const ExoMine = () => {
    const html = `
        <h1>
            Cullen's Estate Sale
        </h1>
        <section id="selectors">
            <div id="colony--select">
                Choose a governor ${Governors()}
            </div>
            <div id="mine--select">
                Choose a mine ${Mines()}
            </div>
        </section>
        <section id="mine--inventory">
            <div id="mine--header">
                <h2>Facility Minerals</h2>
            </div>
            <div id="mine--inventoryDisplay"></div>
        </section>
        <section id="cart">
            <h3>
                Space Cart
            </h3>
            <button id="purchase">
                Purchase Mineral
            </button>
        Cart refresh function goes here
        </section>
    `

    document.querySelector("#container").innerHTML = html;
}