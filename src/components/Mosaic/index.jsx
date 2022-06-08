import { useState } from "react";
import { Link } from "react-router-dom";
import { repo } from "../../config";
import "./index.css";

export default function Mosaic({ data }) {
    const [range, setRange] = useState(100);

    const handleMouseOver = (e) => {
        e.target.nextElementSibling.style.display = "block";
    };

    const handleMouseLeave = (e) => {
        e.target.nextElementSibling.style.display = "none";
    };

    return (
        <div className="mosaic-container-wrapper">
            {/* <div className="range">
                #{data[0]?.edition} - #{data[data.length - 1]?.edition}
            </div> */}
            <div className="count">{data.length} NFTs found</div>

            <div className="mosaic-container">
                {data.slice(0, range).map((nft, i) => (
                    <Link to={`/nfts/${nft.edition}`} key={i + 1}>
                        <div className="thumbnail">
                            <img
                                alt="nft"
                                src={`${repo}/images/${nft.edition}.png`}
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                            ></img>
                            <div className="tag">SPUNKS #{nft.edition}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {data.length > 100 && (
                <div
                    className="custom-button"
                    onClick={() => setRange(range + 100)}
                >
                    Load more
                </div>
            )}
        </div>
    );
}
