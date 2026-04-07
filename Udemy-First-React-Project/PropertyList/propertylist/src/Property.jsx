function Property({ id, name, rating, price }) {
    return (
        <div>
            <h2>{name}</h2>
            <h3>${price} at night</h3>
            <h4>{rating}star</h4>
        </div>
    )
}

export default Property