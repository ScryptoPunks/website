import "./index.css";
import { Link } from "react-router-dom";

export default function Mosaic({ data }) {
    const handleMouseOver = (e) => {
        e.target.nextElementSibling.style.display = "block";
    };

    const handleMouseLeave = (e) => {
        e.target.nextElementSibling.style.display = "none";
    };

    return (
        <div className="mosaic-container">
            {data.map((nft) => (
                <Link to={"../nfts/" + nft["edition"]} key={nft["edition"]}>
                    <div className="thumbnail">
                        <img
                            alt="nft"
                            src={"/perf/" + nft["edition"] + ".jpg"}
                            onMouseOver={handleMouseOver}
                            onMouseLeave={handleMouseLeave}
                        ></img>
                        <div className="tag">SPUNKS #{nft["edition"]}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
