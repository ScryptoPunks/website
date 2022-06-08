import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Home() {
    const phrase = "Join the revolution.";
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < phrase.length)
            setTimeout(() => {
                setIndex((i) => i + 1);
            }, 100);
    }, [index]);

    return (
        <>
            <div className="landing">
                <h1 className="typing">{phrase.substring(0, index)}</h1>
                <div
                    style={{ backgroundColor: "rgba(17, 17, 17, 0.5)" }}
                    className="custom-button"
                >
                    <Link to="collection">Explore</Link>
                </div>
            </div>
        </>
    );
}
