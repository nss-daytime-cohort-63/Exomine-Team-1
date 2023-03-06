

//Query the document and find the container ID
export const ExoMine = () => {
    const html = `
        <h1>
            Marketplace for Attractive People
        </h1>
        <div id="selectors">
        Colonies/Governors function goes here.
        Mines function goes here
        </div>
        <section id="cart">
        Cart function goes here
        </section>
    `

    document.querySelector("#container").innerHTML = html;
}