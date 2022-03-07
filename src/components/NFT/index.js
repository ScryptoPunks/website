import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

export default function NFT() {
    const [attributes, setAttributes] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/json/${id}.json`)
            .then((res) => res.json())
            .then((json) => setAttributes(json["attributes"]));
    }, [id]);

    return (
        <div className="container">
            <div className="left-panel">
                <div className="nft-tag">#{id}</div>
                <div className="image-container">
                    <img
                        className="nft-img"
                        alt="nft"
                        src={`/images/${id}.png`}
                    />
                </div>
            </div>
            <div className="right-panel">
                {attributes.map((attribute, i) => (
                    <div className="attribute" key={i}>
                        <span className="trait-type">
                            {attribute["trait_type"]}:
                        </span>
                        <div className="trait-value">
                            <span>{attribute["value"]}</span>
                            {/* <span class="rare rarity">Rare (16.79%)</span> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
