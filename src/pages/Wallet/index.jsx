import React, { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import Mosaic from "../../components/Mosaic";
import { useParams } from "react-router-dom";

export default function Wallet() {
    const [valid, setValid] = useState(true);
    const [data, setData] = useState();

    const { address } = useParams();

    useEffect(() => {
        if (address.length !== 65 || !address.startsWith("rdx1"))
            setValid(false);
        else {
            fetch("/json/database.json")
                .then((res) => res.json())
                .then((json) => {
                    setData(
                        Object.entries(json)
                            .filter(([key, value]) => value === address)
                            .map((entry) => {
                                return {
                                    edition: parseInt(entry[0]),
                                };
                            })
                    );
                });
        }
    }, [address]);

    return (
        <>
            {valid ? (
                data && (
                    <main className="wallet-container">
                        <Mosaic data={data} />
                    </main>
                )
            ) : (
                <ErrorPage />
            )}
        </>
    );
}
