import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import NFT from "./pages/NFT";
import Wallet from "./pages/Wallet";
import Trading from "./pages/Trading";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="collection" element={<Collection />}></Route>
                    <Route path="nfts/:id" element={<NFT />}></Route>
                    <Route path="wallet/:address" element={<Wallet />}></Route>
                    <Route path="trading" element={<Trading />}></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
