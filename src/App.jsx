import React from "react";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
    return (
        <>
            <Header />
            <Outlet />
            <AudioPlayer />
            {/* <Footer /> */}
        </>
    );
}
