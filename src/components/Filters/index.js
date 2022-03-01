import React, { useState, useEffect } from "react";
import "./index.css";

export default function Filters({ filters, func }) {
    const [data, setData] = useState([]);
    const [f, setF] = useState(filters);

    useEffect(() => {
        fetch("./json/_reset.json")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    const handleClick = (e) => {
        const layer = e.target.parentElement.parentElement.dataset.layer;
        const trait = e.target.value;
        let copy = [...f];
        let index = f[layer].indexOf(trait);
        if (index === -1) copy[layer].push(trait);
        else copy[layer].splice(index, 1);
        setF(copy);
        func(f);
    };

    return (
        <div className="filters-container">
            {Object.keys(data).map((layer, i) => {
                return (
                    <div className="filters" key={i} data-layer={i}>
                        <h3>{layer}</h3>
                        {Object.keys(data[layer]).map((trait, j) => {
                            return (
                                <div className="filter" key={j}>
                                    <input
                                        type="checkbox"
                                        id={trait}
                                        value={trait}
                                        onClick={handleClick}
                                    />
                                    <label htmlFor={trait}>{trait}</label>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
