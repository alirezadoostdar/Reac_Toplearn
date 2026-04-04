import ColorList from "./ColorList"

function ShoppingList({ items }) {
    return (
        <div>
            <ul>
                {items.map((i) => (
                    <li style={
                        {
                            color: i.quantity === 0 ? "red" : "green"
                        }
                    }>
                        Title : {i.title} - Price : {i.price} - Quantity : {i.quantity}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShoppingList