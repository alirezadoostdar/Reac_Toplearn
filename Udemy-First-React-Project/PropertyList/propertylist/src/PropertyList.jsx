import Property from "./Property"
import "./PropertyList.css"

function PropertyList({ propertise }) {
    return (
        <div className="PropertyList">
            {propertise.map(p => (
                <Property {...p} key={p.id} />
            ))}
        </div>
    )
}

export default PropertyList