import{ addCustomOrder} from "./database.js"

export const purchaseButton = () => {document.addEventListener(
    "click", (clickEvent) => {  
        const itemClicked = clickEvent.target      
        if (itemClicked.id.startsWith("purchase")){
            addCustomOrder()
        }
    }
)  }