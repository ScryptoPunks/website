import React, { useEffect, useState } from "react";
import { api, wallet } from "../../config";
import "./index.css";

export default function Trading() {
    const [volume, setVolume] = useState(0);
    const [trades, setTrades] = useState(0);
    const [ath, setAth] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            fetch(`${api}/stats.json`)
                .then((res) => res.json())
                .then((json) => {
                    setVolume(json["volume"]);
                    setTrades(json["trades"]);
                    setAth(json["ath"])
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
                        <div className="txs-stats">Transactions: {trades}</div>
                        <div className="price-stats">
                            <div className="ath-stats">
                                ATH: {ath} XRD 
                            </div>
                            <div className="avg-stats">
                                Average price: {Math.round(volume / trades)} XRD
                            </div>
                        </div>
                        <div className="volume-stats">Volume: {volume} XRD</div>
                    </div>
                </div>

                <div className="instructions-container">
                    <div className="instructions-container-wrapper">
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
                            <div>
                                <span>ScryptoPunks wallet:</span>{" "}
                                <span style={{ wordBreak: "break-word" }}>
                                    {wallet}
                                </span>
                            </div>
                            <span
                                className="custom-button"
                                onClick={() =>
                                    navigator.clipboard.writeText(wallet)
                                }
                            >
                                Copy address
                            </span>
                        </div>
                        <div className="process">
                            <ul>
                                <li>
                                    Send the XRD or SPUNKS you are trading to
                                    the address above. NOT each others' wallets!
                                </li>
                                <li>
                                    The message MUST have the following format
                                    and must not be encrypted:
                                    <br />
                                    <code>trading (offer) for (request)</code>
                                    <br />
                                    where (offer) is what you are sending in the
                                    transaction and (request) is what the other
                                    party is sending in theirs.
                                </li>
                                <li>
                                    If there is no XRD being traded, please send
                                    an additional transaction with the 10 XRD
                                    trading fee from either wallet with the
                                    message "trading fee".
                                </li>
                            </ul>
                            <br />
                            For example, if you want to trade 80 XRD for Punk
                            0123 and 4567, you would send 80 XRD to the
                            ScryptoPunks wallet with this message:
                            <br />
                            <code>trading 80 XRD for 0123, 4567</code>
                            <br />
                            The other party would have to send 2 SPUNKS tokens
                            to the ScryptoPunks wallet with this message:
                            <br />
                            <code>trading 0123, 4567 for 80 XRD</code>
                            <br />
                            If there is a match there, the trade will be
                            processed during the day (will soon be automated).
                            The recipient would receive 70 XRD (80 - 10 trading
                            fee), and you would recieve 2 SPUNKS tokens.
                        </div>
                        <h4>
                            <a
                                href={`${api}/database.json`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Click here to check the database
                            </a>
                        </h4>
                    </div>
                </div>

                <div className="faq-container">
                    <div className="faq-container-wrapper">
                        <h3>Trading FAQ</h3>
                        <div
                            className="faq-item"
                            onClick={(e) =>
                                e.target.parentElement.classList.toggle(
                                    "active"
                                )
                            }
                        >
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
                        <div
                            className="faq-item"
                            onClick={(e) =>
                                e.target.parentElement.classList.toggle(
                                    "active"
                                )
                            }
                        >
                            <div className="question">
                                I did something wrong and don't know what to
                                do...
                            </div>
                            <div className="answer">
                                Contact us on Twitter or Discord and we will try
                                to help you.
                            </div>
                        </div>
                        <div
                            className="faq-item"
                            onClick={(e) =>
                                e.target.parentElement.classList.toggle(
                                    "active"
                                )
                            }
                        >
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
