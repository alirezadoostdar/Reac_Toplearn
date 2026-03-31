function ColorList({ colors }) {
    const element = colors.map(color => <li>{color}</li>)
    return (
        <div>
            <ui>{element}</ui>
        </div>
    )
}
export default ColorList