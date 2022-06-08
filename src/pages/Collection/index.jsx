import React, { useState, useEffect } from "react";
import Mosaic from "../../components/Mosaic";
import Select from "react-select";
import { api } from "../../config";
import "./index.css";

export default function App() {
    const [options, setOptions] = useState([]);
    const [layers, setLayers] = useState([]);

    const [metadata, setMetadata] = useState([]);
    const [database, setDatabase] = useState();
    const [filters, setFilters] = useState([[], [], [], [], [], [], []]);
    const [wallet, setWallet] = useState();
    const [ranks, setRanks] = useState();
    const [filtered, setFiltered] = useState([]);

    const handleChange = (selected, index) => {
        console.log("Handle change");
        let copy = [...filters];
        copy[index] = selected.map((elt) => {
            return elt["value"];
        });
        setFilters(copy);
    };

    const checkValid = (nft) => {
        // console.count("Check valid");
        if (wallet && !wallet.includes(nft.edition)) {
            return false;
        }
        let isValid = true;
        for (let i = 0; i < filters.length; i++) {
            if (
                filters[i].length > 0 &&
                !filters[i].includes(nft.attributes[i].value)
            ) {
                isValid = false;
                break;
            }
        }
        return isValid;
    };

    const sortNFTs = (sort) => {
        console.count("Sort");
        if (sort === "Random") {
            setFiltered(
                filtered
                    .map((value) => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
            );
        } else if (sort === "Rank") {
            let cpy = [...filtered];
            cpy.sort((a, b) => ranks[a.edition] - ranks[b.edition]);
            setFiltered(cpy);
        } else {
            let cpy = [...filtered];
            cpy.sort((a, b) => a.edition - b.edition);
            setFiltered(cpy);
        }
    };

    useEffect(() => {
        fetch(`/json/_options.json`)
            .then((res) => res.json())
            .then((json) => {
                for (let layer of Object.keys(json)) {
                    setLayers((prevState) => [...prevState, layer]);
                    setOptions((prevState) => [...prevState, json[layer]]);
                }
            });
        fetch(`/json/_metadata.json`)
            .then((res) => res.json())
            .then((json) => {
                setMetadata(json);
                setFiltered(json.filter((nft) => checkValid(nft)));
            });
        fetch(`/json/_ranks.json`)
            .then((res) => res.json())
            .then((json) => setRanks(json));
        fetch(`${api}/database.json`)
            .then((res) => res.json())
            .then((json) => setDatabase(json));
    }, []);

    useEffect(() => {
        setFiltered(metadata.filter((nft) => checkValid(nft)));
    }, [filters, wallet]);

    return (
        <div className="collection-container">
            <div className="select-container-wrapper">
                <div className="select-container">
                    {layers.map((layer, index) => (
                        <div className="select" key={index}>
                            <span>{layer}</span>
                            <Select
                                isMulti
                                options={options[index]}
                                onChange={(s) => handleChange(s, index)}
                                className="select-input"
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: "#222",
                                        neutral0: "#111",
                                        dangerLight: "#ffdc00",
                                        primary: "#ffdc00",
                                    },
                                })}
                            />
                        </div>
                    ))}
                </div>
                <div className="search-container">
                    Search by wallet:
                    <input
                        type="text"
                        placeholder="Enter your address"
                        onChange={(e) => {
                            const address = e.currentTarget.value;
                            if (address) {
                                const x = Object.keys(database)
                                    .filter((key) => database[key] === address)
                                    .map((key) => parseInt(key));
                                setWallet(x);
                            } else setWallet(undefined);
                        }}
                    />
                </div>
                <div className="sort-container">
                    Sort by:
                    <select onChange={(e) => sortNFTs(e.currentTarget.value)}>
                        <option value="Ascending">Ascending</option>
                        <option value="Rank">Rank</option>
                        <option value="Random">Random</option>
                    </select>
                </div>
            </div>

            <Mosaic data={filtered} />
        </div>
    );
}
