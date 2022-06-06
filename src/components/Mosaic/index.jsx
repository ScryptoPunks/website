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
            {/* <div className="range">
                #{data[0]?.edition} - #{data[data.length - 1]?.edition}
            </div> */}
            <div className="mosaic-container">
                {data.map((nft, i) => (
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
        </div>
    );
}
