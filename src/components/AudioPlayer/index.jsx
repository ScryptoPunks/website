import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faBackwardStep,
    faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import Lottie from "react-lottie";
import animationData from "./../../assets/volume.json";
import playerImage from "./../../assets/player.png";
import { songs, repo } from "./../../config";
import "./index.css";

export default function AudioPlayer() {
    const [songIndex, setSongIndex] = useState(0);
    const [paused, setPaused] = useState(true);
    const player = useRef();

    const defaultOptions = {
        loop: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const handlePrev = () => {
        setPaused(false);
        if (songIndex === 0) setSongIndex(songs.length - 1);
        else setSongIndex(songIndex - 1);
        console.log(player.current);
        player.current.load();
        player.current.play();
    };

    const handlePausePlay = () => {
        if (player.current.paused) player.current.play();
        else player.current.pause();
        setPaused(!paused);
    };

    const handleNext = () => {
        setPaused(false);
        if (songIndex === songs.length - 1) setSongIndex(0);
        else setSongIndex(songIndex + 1);
        player.current.load();
        player.current.play();
    };

    useEffect(() => {
        player.current.addEventListener("ended", () => {
            handleNext();
        });
    });

    return (
        <div className="audio-player" title={songs[songIndex]}>
            <audio ref={player}>
                <source
                    src={`${repo}/${songs[songIndex].split(" by")[0]}.mp3`}
                    type="audio/mpeg"
                />
            </audio>

            <img src={playerImage} alt="player" />

            <div className="lottie-container">
                <Lottie
                    options={defaultOptions}
                    height={40}
                    width={40}
                    style={{ opacity: paused ? 0 : 1 }}
                />
            </div>

            <div className="song-info">
                <div className="song-title">
                    {songs[songIndex].split(" by")[0].toUpperCase()}
                </div>
                <div className="song-artist">
                    {songs[songIndex].split(" by")[1].toUpperCase()}
                </div>
            </div>

            <div className="controls">
                <FontAwesomeIcon icon={faBackwardStep} onClick={handlePrev} />
                <FontAwesomeIcon
                    icon={paused ? faPlay : faPause}
                    onClick={handlePausePlay}
                />
                <FontAwesomeIcon icon={faStepForward} onClick={handleNext} />
            </div>
        </div>
    );
}
