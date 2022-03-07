import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

export default function NFT() {
    const [attributes, setAttributes] = useState();
    const [rarity, setRarity] = useState();
    const { id } = useParams();

    useEffect(() => {
        fetch(`/json/${id}.json`)
            .then((res) => res.json())
            .then((json) => setAttributes(json["attributes"]));
        fetch("/json/_rarity.json")
            .then((res) => res.json())
            .then((json) => setRarity(json));
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
                {attributes && rarity && attributes.map((attribute, i) => {
                    const layer = attribute["trait_type"];
                    const trait = attribute["value"];
                    const occurence = rarity[layer][trait];
                    
                    let category;
                    if (occurence < 100) category = "mythic";
                    else if (occurence < 500) category = "legendary";
                    else if (occurence < 1000) category = "epic";
                    else if (occurence < 2500) category = "rare";
                    else if (occurence < 5000) category = "uncommon";
                    else category = "common";

                    return (
                        <div className="attribute" key={i}>
                            <span className="trait-type">
                                {attribute["trait_type"]}:
                            </span>
                            <div className="trait-value">
                                <span>{attribute["value"]}</span>
                                <span className={`rarity ${category}`}>
                                    {category} ({occurence / 100}%)
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}