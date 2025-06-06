import Star from "./Star.jsx";
import {useState} from "react";

export default function StarRating({
                                       maxRating = 5,
                                       color = "#fcc419",
                                       size = 48,
                                       messages = [],
                                       defaultRating = 0,
                                       onSetRating,
                                   }) {
    const [rating, setRating] = useState(defaultRating);
    const [tempRate, setTempRate] = useState(0);

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color: color,
        fontSize: `${size / 2}px`,
    };

    const handleRating = (i) => {
        const newRating = i + 1;
        setRating(newRating);
        onSetRating?.(newRating);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
            }}
        >
            <div style={{display: "flex"}}>
                {Array.from({length: maxRating}, (_, i) => (
                    <Star
                        key={i}
                        onRate={() => handleRating(i)}
                        full={tempRate ? tempRate >= i + 1 : rating >= i + 1}
                        onHoverIn={() => setTempRate(i + 1)}
                        onHoverOut={() => setTempRate(0)}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            <p style={textStyle}>
                {messages.length === maxRating
                    ? messages[tempRate ? tempRate - 1 : rating - 1]
                    : tempRate || rating || ""}
            </p>
        </div>
    );
}
