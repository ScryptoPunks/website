import { Link } from "react-router-dom";
import { repo } from "../../config";
import "./index.css";

export default function Mosaic({ data }) {
    const handleMouseOver = (e) => {
        e.target.nextElementSibling.style.display = "block";
    };

    const handleMouseLeave = (e) => {
        e.target.nextElementSibling.style.display = "none";
    };

    return (
        <div className="mosaic-container-wrapper">
            <div className="range">
                #{data[0]?.edition} - #{data[data.length - 1]?.edition}
            </div>
            <div className="mosaic-container">
                {data.map((nft, i) => (
                    <Link to={`/nfts/${i + 1}`} key={i + 1}>
                        <div className="thumbnail">
                            {/* <img
                                alt="nft"
                                src={`${repo}/png/${i + 1}.png`}
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                            ></img> */}
                            <div className="top-img skeleton-anim"></div>
                            <div className="skeleton-content">
                                <span style={{ fontSize: "0.6rem" }}>
                                    SPUNKS #
                                </span>
                                <div className="skeleton-text skeleton-anim"></div>
                            </div>
                            {/* <div className="tag">SPUNKS #{i + 1}</div> */}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
