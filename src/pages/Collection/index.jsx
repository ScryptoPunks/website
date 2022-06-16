import React, { useState, useEffect } from "react";
import Mosaic from "../../components/Mosaic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

export default function Collection({ data }) {
    const [options, setOptions] = useState([]);
    const [layers, setLayers] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [filters, setFilters] = useState(Array.from(Array(7), () => []));
    const [opened, setOpened] = useState(Array.from(Array(7), () => false));
    const [filtered, setFiltered] = useState([]);

    const handleChange = (selected, index) => {
        let copy = [...filters];
        copy[index] = [];
        Array.from(selected.children).map((s) => {
            if (s.firstChild.firstChild.checked)
                copy[index].push(s.firstChild.firstChild.value);
            return undefined;
        });
        setFilters(copy);
    };

    useEffect(() => {
        fetch(`/json/_rarity.json`)
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
                data
                    ? setMetadata(data.map((nonce) => json[nonce.edition]))
                    : setMetadata(json);
            });
    }, [data]);

    useEffect(() => {
        setFiltered(metadata);
    }, [metadata]);

    useEffect(() => {
        const checkValid = (nft) => {
            // console.count("Check valid");
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
        setFiltered(metadata.filter((nft) => checkValid(nft)));
    }, [filters, metadata]);

    const renderSelect = () => {
        return (
            <div className="select-container">
                {options.length === 7 &&
                    layers.map((layer, index) => (
                        <div className="select" key={index}>
                            <div
                                className="layer-btn-container"
                                onClick={() => {
                                    let copy = [...opened];
                                    copy[index] = !copy[index];
                                    setOpened(copy);
                                }}
                            >
                                <span>{layer.toUpperCase()}</span>
                                <FontAwesomeIcon
                                    icon={opened[index] ? faMinus : faPlus}
                                />
                            </div>
                            <div
                                style={{
                                    display: opened[index] ? "block" : "none",
                                }}
                                className="select-input"
                                onChange={(s) =>
                                    handleChange(s.currentTarget, index)
                                }
                            >
                                {Object.keys(options[index]).map((option) => (
                                    <div
                                        className="option-container"
                                        key={option}
                                    >
                                        <label>
                                            <input
                                                type="checkbox"
                                                name={option}
                                                value={option}
                                            />
                                            {option.toUpperCase()}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <main className="collection-container">
            <div className="filter-container">
                {renderSelect()}
            </div>

            <Mosaic data={filtered} />
        </main>
    );
}
