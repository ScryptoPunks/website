import React, { useState, useEffect } from "react";
import Mosaic from "../Mosaic";
import Select from "react-select";
import { repo } from "../../config";
import "./index.css";

export default function App() {
    // const [data, setData] = useState([]);
    const [data, setData] = useState(Array.apply(null, Array(100)).map(function () {}));
    const [layers, setLayers] = useState([]);
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
    const [range, setRange] = useState(100);

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
                for (let layer of Object.keys(json)) {
                    setLayers((prevState) => [...prevState, layer]);
                    setOptions((prevState) => [...prevState, json[layer]]);
                }
            });
        // fetch(`${repo}/data/metadata.json`)
        //     .then((res) => res.json())
        //     .then((json) => setData(json));
    }, []);

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
                {/* <div className="count">
                    {
                        data.filter((nft) => {
                            return (
                                checkValid(
                                    filters[0],
                                    nft.attributes[0].value
                                ) &&
                                checkValid(
                                    filters[1],
                                    nft.attributes[1].value
                                ) &&
                                checkValid(
                                    filters[2],
                                    nft.attributes[2].value
                                ) &&
                                checkValid(
                                    filters[3],
                                    nft.attributes[3].value
                                ) &&
                                checkValid(
                                    filters[4],
                                    nft.attributes[4].value
                                ) &&
                                checkValid(
                                    filters[5],
                                    nft.attributes[5].value
                                ) &&
                                checkValid(
                                    filters[6],
                                    nft.attributes[6].value
                                ) &&
                                checkValid(
                                    filters[7],
                                    nft.attributes[7].value
                                ) &&
                                checkValid(filters[8], nft.attributes[8].value)
                            );
                        }).length
                    }{" "}
                    NFTs found
                </div> */}
            </div>
            {data && (
                <Mosaic data={data}></Mosaic>
                // <Mosaic
                //     data={data
                //         .filter((nft) => {
                //             return (
                //                 checkValid(
                //                     filters[0],
                //                     nft.attributes[0].value
                //                 ) &&
                //                 checkValid(
                //                     filters[1],
                //                     nft.attributes[1].value
                //                 ) &&
                //                 checkValid(
                //                     filters[2],
                //                     nft.attributes[2].value
                //                 ) &&
                //                 checkValid(
                //                     filters[3],
                //                     nft.attributes[3].value
                //                 ) &&
                //                 checkValid(
                //                     filters[4],
                //                     nft.attributes[4].value
                //                 ) &&
                //                 checkValid(
                //                     filters[5],
                //                     nft.attributes[5].value
                //                 ) &&
                //                 checkValid(
                //                     filters[6],
                //                     nft.attributes[6].value
                //                 ) &&
                //                 checkValid(
                //                     filters[7],
                //                     nft.attributes[7].value
                //                 ) &&
                //                 checkValid(filters[8], nft.attributes[8].value)
                //             );
                //         })
                //         .slice(0, range)}
                // />
            )}
            <div
                className="custom-button"
                onClick={() => setRange(range + 100)}
            >
                Load more
            </div>
        </div>
    );
}
