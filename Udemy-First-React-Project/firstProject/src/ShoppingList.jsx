function ShoppingList({ items }) {
    return (
        <div>
            <ul>
                {items.map((i) => (
                    <li>
                        {i.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShoppingList