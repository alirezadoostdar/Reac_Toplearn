import { useState } from "react"
import ShoppingListForm from "./ShoppingListForm";

function ShoppingList() {
    const [items, setItems] = useState([
        { id: 1, product: "Banana", quantity: 2 },
        { id: 2, product: "apple", quantity: 13 }])

    const addItem = (item) => {
        console.log(item)
        setItems((currData) => {
            return [...currData, { ...item, id: 9 }]
        })
    }
    return (
        <div>
            <h2>Shopping List</h2>
            <ul>
                {items.map((v, i) => {
                    return <li key={i}>{v.product}-{v.quantity}</li>
                })}
            </ul>
            <ShoppingListForm addItem={addItem} />
        </div>
    )
}

export default ShoppingList;