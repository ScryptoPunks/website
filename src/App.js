import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <>
            <Header />
            <Outlet />
            <footer>© ScryptoPunks 2022</footer>
        </>
    );
}
