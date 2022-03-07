import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Collection from "./components/Collection";
import NFTs from "./components/NFTs";
import NFT from "./components/NFT";
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="collection" element={<Collection />}></Route>
                    <Route path="nfts" element={<NFTs />}>
                        <Route path=":id" element={<NFT />}></Route>
                    </Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
