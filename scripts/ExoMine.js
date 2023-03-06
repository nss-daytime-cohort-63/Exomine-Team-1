import { Mines } from "./MiningFacilities.js";

//Query the document and find the container ID
export const ExoMine = () => {
    const html = `
        <h1>
            Cullen's Estate Sale
        </h1>
        <section id="selectors">
            <div id="colony--select">
                Colonies/Governors function goes here.
            </div>
            <div id="mine--select">
                ${Mines()}
            </div>
        </section>
        <section id="cart">
        Cart function goes here
        </section>
    `

    document.querySelector("#container").innerHTML = html;
}