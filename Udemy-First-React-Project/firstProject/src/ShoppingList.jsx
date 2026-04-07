import ColorList from "./ColorList"
import ShoppingListItem from "./ShoppingListItem"

function ShoppingList({ items }) {
    return (
        <div>
            <ul>
                {items.map((i) => (
                    <ShoppingListItem
                        key={i.id}
                        item={i} />
                ))}
            </ul>
        </div>
    )
}

export default ShoppingList