import "./index.css";

export default function Mosaic({ data }) {
    const handleMouseOver = (e) => {
        e.target.nextElementSibling.style.display = "block";
    };

    const handleMouseLeave = (e) => {
        e.target.nextElementSibling.style.display = "none";
    };

    return (
        <div className="mosaic-container">
            {data.slice(1, 100).map((nft) => (
                <a href={"/" + nft["edition"]} key={nft["edition"]}>
                    <div className="thumbnail">
                        <img
                            alt="nft"
                            src={"/images/" + nft["edition"] + ".png"}
                            onMouseOver={handleMouseOver}
                            onMouseLeave={handleMouseLeave}
                        ></img>
                        <div className="tag">SPUNKS #{nft["edition"]}</div>
                    </div>
                </a>
            ))}
        </div>
    );
}
