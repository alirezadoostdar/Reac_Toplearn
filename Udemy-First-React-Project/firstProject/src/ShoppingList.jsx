function ShoppingList({ items }) {
    return (
        <div>
            <ul>
                {items.map((i) => (
                    <li>
                        Title : {i.title} - Price : {i.price} - Quantity : {i.quantity}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShoppingList