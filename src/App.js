import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Mosaic from "./components/Mosaic";

export default function App() {
    const [data, setData] = useState([]);
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

    useEffect(() => {
        fetch("./json/_metadata.json")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    return (
        <>
            <Header />
            <Mosaic data={data} />
        </>
    );
}
