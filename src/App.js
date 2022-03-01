import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";
import Select from "react-select";

export default function App() {
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    const [filters, setFilters] = useState([
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]);

    const handleChange = (selected, index) => {
        let copy = [...filters];
        copy[index] = selected.map((elt) => {
            return elt["value"];
        });
        setFilters(copy);
    };

    const checkValid = (arr, val) => {
        return arr.includes(val) || arr.length === 0;
    };

    useEffect(() => {
        fetch("./json/_options.json")
            .then((res) => res.json())
            .then((json) => {
                for (let layer of Object.keys(json))
                    setOptions((prevState) => [...prevState, json[layer]]);
            });
        fetch("./json/_metadata.json")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    return (
        <>
            <Header />
            <>
                <Select
                    isMulti
                    options={options[0]}
                    onChange={(s) => handleChange(s, 0)}
                />
                <Select
                    isMulti
                    options={options[1]}
                    onChange={(s) => handleChange(s, 1)}
                />
                <Select
                    isMulti
                    options={options[2]}
                    onChange={(s) => handleChange(s, 2)}
                />
                <Select
                    isMulti
                    options={options[3]}
                    onChange={(s) => handleChange(s, 3)}
                />
                <Select
                    isMulti
                    options={options[4]}
                    onChange={(s) => handleChange(s, 4)}
                />
                <Select
                    isMulti
                    options={options[5]}
                    onChange={(s) => handleChange(s, 5)}
                />
                <Select
                    isMulti
                    options={options[6]}
                    onChange={(s) => handleChange(s, 6)}
                />
                <Select
                    isMulti
                    options={options[7]}
                    onChange={(s) => handleChange(s, 7)}
                />
                <Select
                    isMulti
                    options={options[8]}
                    onChange={(s) => handleChange(s, 8)}
                />
            </>
            <Mosaic
                data={data
                    .filter((nft) => {
                        return (
                            checkValid(filters[0], nft.attributes[0].value) &&
                            checkValid(filters[1], nft.attributes[1].value) &&
                            checkValid(filters[2], nft.attributes[2].value) &&
                            checkValid(filters[3], nft.attributes[3].value) &&
                            checkValid(filters[4], nft.attributes[4].value) &&
                            checkValid(filters[5], nft.attributes[5].value) &&
                            checkValid(filters[6], nft.attributes[6].value) &&
                            checkValid(filters[7], nft.attributes[7].value) &&
                            checkValid(filters[8], nft.attributes[8].value)
                        );
                    })
                    .slice(0, 100)}
            />
            <footer>© ScryptoPunks 2022</footer>
        </>
    );
}
