import { Rating } from "@mui/material";
import { useState } from "react";

function RatingDemo() {
    const [score, setScore] = useState(3.5);
    return (
        <div>
            <h1>Rating Demo. Current Score:{score}</h1>
            <Rating
                name="simple "
                value={score}
                onChange={(event, newValue) => {
                    setScore(newValue)
                }} />
        </div>
    )
}

export default RatingDemo