function ColorList({ colors }) {
    const element = colors.map(color => <li>{color}</li>)
    return (
        <div>
            <ul>
                {colors.map(c =>
                    <li style={{ color: c }}>{c}</li>
                )}
            </ul>
        </div>
    )
}
export default ColorList