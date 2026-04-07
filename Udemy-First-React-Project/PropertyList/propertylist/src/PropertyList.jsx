import Property from "./Property"

function PropertyList({ propertise }) {
    return (
        <div>
            {propertise.map(p => {
                <Property {...p} key={p.id} />
            })}
        </div>
    )
}

export default PropertyList