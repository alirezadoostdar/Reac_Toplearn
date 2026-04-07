function ShoppingListItem({ item }) {
    const style = {
        color: item.quantity === 0 ? "red" : "green",
        textDecoration: item.quantity === 0 ? "line-through" : "none"
    };
    return <li style={style}>
        {item.title} - {item.price} - {item.quantity}
    </li>
}

export default ShoppingListItem