import Die from "./Die"
import "./Dice.css"

function Dice({ dice }) {
    return (
        <section className="Dice">
            {dice.map((v, i) => {
                return <Die key={i} val={v} />
            })}
        </section>
    )
}

export default Dice