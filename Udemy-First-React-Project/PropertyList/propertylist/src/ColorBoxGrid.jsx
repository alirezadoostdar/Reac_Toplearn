import ColorBox from "./ColoBox";
import "./ColorBoxGrid.css"

function ColorBoxGrid({ count, colors }) {
    const boxes = [];
    for (let index = 0; index < count; index++) {
        boxes.push(<ColorBox colorList={colors} />)
    }
    console.log(boxes)
    return (
        <div className="ColorBoxGrid">
            {boxes}
        </div>
    )
}

export default ColorBoxGrid