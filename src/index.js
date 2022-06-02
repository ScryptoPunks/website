import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Collection from "./components/Collection";
import NFT from "./components/NFT";
import Trading from "./components/Trading";
import ErrorPage from "./components/ErrorPage";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="collection" element={<Collection />}></Route>
                    <Route path="nfts/:id" element={<NFT />}></Route>
                    <Route path="trading" element={<Trading />}></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
