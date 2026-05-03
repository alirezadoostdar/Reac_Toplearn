import { useState } from "react"

function ShoppingListForm({ addItem }) {
    const [formData, setFormData] = useState({ product: "", quantity: 1 });

    const handleFormDate = (evt) => {
        setFormData(currDate => {
            return {
                ...currDate,
                [evt.target.name]: evt.target.value
            }
        })
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(formData);
        addItem(formData);
    }
    return (
        <form onSubmit={submit}>
            <label htmlFor="product">Product</label>
            <input
                type="text"
                id="product"
                value={formData.product}
                name="product"
                onChange={handleFormDate}
                placeholder="product"
            />

            <label htmlFor="quantity">Quantity</label>
            <input
                type="nember"
                id="quantity"
                value={formData.quantity}
                name="quantity"
                onChange={handleFormDate}
                placeholder="quantity"
            />

            <button>Submit</button>
        </form>
    )
}

export default ShoppingListForm;