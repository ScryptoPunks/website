import React, { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import { useParams } from "react-router-dom";
import { repo } from "../../config";
import "./index.css";

export default function NFT() {
    const [attributes, setAttributes] = useState();
    const [rarity, setRarity] = useState();
    const [rank, setRank] = useState();
    const [owner, setOwner] = useState();
    const [valid, setValid] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        if (id < 1 || id > 10000) setValid(false);
        else {
            fetch("/json/database.json")
                .then((res) => res.json())
                .then((json) => setOwner(json[id.padStart(4, "0")]));

            fetch(`${repo}/json/${id}.json`)
                .then((res) => res.json())
                .then((json) => setAttributes(json["attributes"]));
            fetch(`${repo}/rarity.json`)
                .then((res) => res.json())
                .then((json) => setRarity(json));
            fetch(`${repo}/ranks.json`)
                .then((res) => res.json())
                .then((json) => setRank(json[id]));
        }
    }, [id]);

    return (
        <>
            {valid ? (
                <div className="nft-container">
                    <div className="left-panel">
                        <div className="nft-tag">#{id}</div>
                        <div className="image-container">
                            <img
                                className="nft-img"
                                alt="nft"
                                src={`${repo}/images/${id}.png`}
                            />
                        </div>
                    </div>
                    <div className="right-panel">
                        {attributes &&
                            rarity &&
                            attributes.map((attribute, i) => {
                                const layer = attribute["trait_type"];
                                const trait = attribute["value"];
                                const occurence = rarity[layer][trait];

                                // const nbLayersInCategory = Object.keys(rarity[layer]).length;
                                // const reference = 10000 / nbLayersInCategory / occurence;

                                let category;
                                if (occurence < 100) category = "mythic";
                                else if (occurence < 250)
                                    category = "legendary";
                                else if (occurence < 500) category = "epic";
                                else if (occurence < 1000) category = "rare";
                                else if (occurence < 2000)
                                    category = "uncommon";
                                else category = "common";

                                return (
                                    <div className="attribute" key={i}>
                                        <span className="trait-type">
                                            {attribute["trait_type"]}:
                                        </span>
                                        <div className="trait-value">
                                            <span>{attribute["value"]}</span>
                                            <span
                                                className={`rarity ${category}`}
                                            >
                                                {category} (
                                                {(occurence / 100).toFixed(1)}%)
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}

                        {!attributes &&
                            [0, 1, 2, 3, 4, 5, 6].map((attribute, i) => {
                                return (
                                    <div className="attribute" key={i}>
                                        <div className="skeleton-content">
                                            <div className="skeleton-title skeleton-anim"></div>
                                            <div className="skeleton-text skeleton-anim"></div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="info-container">
                        <div className="owner">Owner: {owner}</div>
                        <div className="rank">
                            <span>Rank: {rank}</span>
                            {!rank && (
                                <div className="skeleton-title skeleton-anim"></div>
                            )}
                        </div>
                    </div>

                    {/* TWITTER BUTTON */}
                    <a
                        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                        className="twitter-share-button"
                        data-size="large"
                        data-text={`Check out this cool @ScryptoPunks NFT!`}
                        data-show-count="false"
                    >
                        Share
                    </a>
                    <script
                        async
                        src="https://platform.twitter.com/widgets.js"
                        charSet="utf-8"
                    ></script>
                </div>
            ) : (
                <ErrorPage />
            )}
        </>
    );
}
