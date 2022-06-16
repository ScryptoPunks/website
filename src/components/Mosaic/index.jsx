import React, { useState, useEffect } from "react";
import { MenuItem, InputLabel, Select, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import "./index.css";

export default function Mosaic({ data }) {
    const [filtered, setFiltered] = useState([]);
    const [ranks, setRanks] = useState();
    const [range, setRange] = useState(100);
    const [sort, setSort] = useState(1);

    useEffect(() => {
        fetch(`/json/_ranks.json`)
            .then((res) => res.json())
            .then((json) => setRanks(json));
    }, []);

    useEffect(() => {
        setFiltered(data);
    }, [data]);

    useEffect(() => {
        if (sort === 1)
            setFiltered((f) => [...f].sort((a, b) => a.edition - b.edition));
        else if (sort === 2)
            setFiltered((f) => [...f].sort((a, b) => b.edition - a.edition));
        else if (sort === 3)
            setFiltered((f) =>
                [...f].sort((a, b) => ranks[a.edition] - ranks[b.edition])
            );
        else if (sort === 4)
            setFiltered((f) =>
                [...f].sort((a, b) => ranks[b.edition] - ranks[a.edition])
            );
        else
            setFiltered((f) =>
                f
                    .map((value) => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
            );
    }, [ranks, sort]);

    return (
        <div className="mosaic-container-wrapper">
            <div className="mosaic-top">
                <div>
                    <FormControl>
                        <InputLabel id="sort-by">Sort by:</InputLabel>
                        <Select
                            labelId="sort-by"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            style={{ width: "20ch" }}
                        >
                            <MenuItem value={1}># (Ascending)</MenuItem>
                            <MenuItem value={2}># (Descending)</MenuItem>
                            <MenuItem value={3}>
                                Rank (Most to least rare)
                            </MenuItem>
                            <MenuItem value={4}>
                                Rank (Least to most rare)
                            </MenuItem>
                            <MenuItem value={5}>Random</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>{filtered.length} NFTs found</div>
            </div>

            <div className="mosaic-container">
                {filtered.slice(0, range).map((nft, i) => (
                    <Link to={`/nfts/${nft.edition}`} key={i + 1}>
                        <div className="thumbnail">
                            <img
                                alt="nft"
                                src={`https://scryptopunks.com/images/${nft.edition}.png`}
                                onMouseOver={(e) =>
                                    (e.target.nextElementSibling.style.display =
                                        "block")
                                }
                                onMouseLeave={(e) =>
                                    (e.target.nextElementSibling.style.display =
                                        "none")
                                }
                            ></img>
                            <div className="tag">SPUNKS #{nft.edition}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {filtered.length > 100 && (
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
