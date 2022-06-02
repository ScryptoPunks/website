import React, { useEffect, useState } from "react";
import { api, wallet } from "../../config";
import "./index.css";

export default function Trading() {
    const [volume, setVolume] = useState(0);
    const [trades, setTrades] = useState(0);

    const handleFAQClick = (e) => {
        console.log(e.currentTarget);
        e.target.parentElement.classList.toggle("active");
    };

    useEffect(() => {
        const fetchStats = async () => {
            fetch(`${api}/stats.json`)
                .then((res) => res.json())
                .then((json) => {
                    setVolume(json["volume"]);
                    setTrades(json["trades"]);
                });
        };
        fetchStats();
    }, []);

    return (
        <main>
            <div className="trading-container">
                <h2>ScryptoPunks Trading</h2>

                <div className="stats-container-wrapper">
                    <h3>Trading stats</h3>
                    <div className="stats-container">
                        <div className="txs-stats">{trades} trades</div>
                        <div className="volume-stats">{volume} XRD volume</div>
                    </div>
                </div>

                <div className="instructions-container">
                    <div className="instructions-container">
                        <h3>Trading instructions</h3>
                        <div className="rules">
                            <p>
                                All trades are subject to a 10% fee (minimum 10
                                XRD).
                            </p>
                            <p>
                                Please follow these instructions carefully. Any
                                errors may result in longer waiting times or
                                loss of funds.
                            </p>
                        </div>
                        <div className="wallet">
                            <span>ScryptoPunks trading wallet:</span>
                            <span>{wallet}</span>
                            <div
                                className="custom-button"
                                onClick={() =>
                                    navigator.clipboard.writeText(wallet)
                                }
                            >
                                Copy address
                            </div>
                        </div>
                    </div>
                </div>

                <div className="faq-container">
                    <div className="faq-container-wrapper">
                        <h3>Trading FAQ</h3>
                        <div className="faq-item" onClick={handleFAQClick}>
                            <div className="question">
                                How long should my trade take?
                            </div>
                            <div className="answer">
                                It should process within minutes... if it takes
                                longer than 30 minutes the system may be in
                                temporary maintenance or something was wrong
                                with your message.
                            </div>
                        </div>
                        <div className="faq-item" onClick={handleFAQClick}>
                            <div className="question">
                                I did something wrong and don't know what to
                                do...
                            </div>
                            <div className="answer">
                                Contact us on Twitter or Discord and we will try
                                to help you.
                            </div>
                        </div>
                        <div className="faq-item" onClick={handleFAQClick}>
                            <div className="question">
                                What is the 10% fee for?
                            </div>
                            <div className="answer">
                                The 10% fee helps to cover costs for up-keep of
                                the system and generates revenue for the project
                                that will contribute to future developments.
                                However, this isn't fixed and could be lowered
                                depending on volumes and trade prices.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
