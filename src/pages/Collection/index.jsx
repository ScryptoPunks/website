import React, { useState, useEffect } from "react";
import Mosaic from "../../components/Mosaic";
import Select from "react-select";
import { api, repo } from "../../config";
import "./index.css";

export default function App() {
    const [data, setData] = useState([]);
    const [layers, setLayers] = useState([]);
    const [options, setOptions] = useState([]);
    const [filters, setFilters] = useState([[], [], [], [], [], [], []]);
    const [range, setRange] = useState(100);
    const [wallet, setWallet] = useState();
    const [sort, setSort] = useState("Ascending");
    const [database, setDatabase] = useState();
    const [ranks, setRanks] = useState();

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

    const sortNFTs = (data) => {
        if (sort === "Random") {
            return data
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
        } else if (sort === "Rank") {
            return Object.entries(ranks)
                .sort(([, a], [, b]) => a - b)
                .map((entry) => {
                    return { edition: parseInt(entry[0]) };
                });
        } else return data;
    };

    useEffect(() => {
        fetch(`${repo}/_options.json`)
            .then((res) => res.json())
            .then((json) => {
                for (let layer of Object.keys(json)) {
                    setLayers((prevState) => [...prevState, layer]);
                    setOptions((prevState) => [...prevState, json[layer]]);
                }
            });
        fetch(`${repo}/_metadata.json`)
            .then((res) => res.json())
            .then((json) => setData(json));
        fetch(`${api}/database.json`)
            .then((res) => res.json())
            .then((json) => setDatabase(json));
        fetch(`${repo}/ranks.json`)
            .then((res) => res.json())
            .then((json) => setRanks(json));
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
                <div className="count">
                    {wallet
                        ? Object.entries(database).filter(
                              ([key, value]) => value === wallet
                          ).length
                        : data.filter((nft) => {
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
                                  )
                              );
                          }).length}{" "}
                    NFTs found
                </div>
                <div className="search-container">
                    Search by wallet:
                    <input
                        type="text"
                        placeholder="Enter your address"
                        onChange={(e) => setWallet(e.currentTarget.value)}
                    />
                </div>
                <div className="sort-container">
                    Sort by:
                    <select onChange={(e) => setSort(e.currentTarget.value)}>
                        <option value="Ascending">Ascending</option>
                        <option value="Rank">Rank</option>
                        <option value="Random">Random</option>
                    </select>
                </div>
            </div>
            {data && (
                <Mosaic
                    data={
                        wallet
                            ? sortNFTs(
                                  Object.entries(database)
                                      .filter(
                                          ([key, value]) => value === wallet
                                      )
                                      .map((entry) => {
                                          return {
                                              edition: parseInt(entry[0]),
                                          };
                                      })
                              ).slice(0, range)
                            : sortNFTs(
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
                                          )
                                      );
                                  })
                              ).slice(0, range)
                    }
                />
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
