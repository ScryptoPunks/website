import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import "./index.css";
import gif from "./../../assets/mint.gif";
import gallery from "./../../assets/gallery.png";

export default function Home() {
    const phrase = "Join the revolution.";
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < phrase.length)
            setTimeout(() => {
                setIndex((i) => i + 1);
            }, 100);
    }, [index]);

    return (
        <>
            <div className="landing">
                <h1 className="typing">{phrase.substring(0, index)}</h1>
                <div
                    style={{ backgroundColor: "rgba(17, 17, 17, 0.5)" }}
                    className="custom-button"
                >
                    <Link to="collection">Explore</Link>
                </div>
            </div>

            {/* <div className="main-container">
                <div id="about">
                    <div className="about-container">
                        <div className="left">
                            <h1>SCRYPTO PUNKS</h1>
                            <p>
                                The 1st ever Punks-inspired NFT collection on
                                Radix! Besides really cool avatars, we seeks to
                                become the reference in terms of
                                community-driven project on this ecosystem.
                            </p>

                            <p>
                                Owning one of these masterpiece in your wallet
                                gives you several advantages: rewards from
                                staking, reduced fees on NFT marketplace, DAO
                                membership, access to IRL events, and much more!
                            </p>
                        </div>
                        <div className="right">
                            <img src={gallery} alt="gallery" />
                        </div>
                    </div>
                </div>

                <div id="mint">
                    <div className="mint-container">
                        <div className="left">
                            <img src={gif} alt="gif" />
                        </div>
                        <div className="right">
                            <h1>MINT</h1>
                            <div className="text">
                                While waiting for the Babylon release, scheduled
                                by the Radix team for late 2022,{" "}
                                <i>
                                    you can reserve NFTs by sending XRD to the
                                    official ScryptoPunks wallet. In exchange,
                                    SPUNKS tokens will be sent to your wallet.
                                </i>{" "}
                                <strong>SOLD OUT</strong>
                                <br />
                                <br />
                                Once Babylon is live, we will deploy the Smart
                                Contract. You will then be able to trade your
                                SPUNKS tokens and mint randomly selected NFTs!
                            </div>
                        </div>
                    </div>
                </div>

                <div id="roadmap">
                    <div className="left">
                        <h1>ROADMAP</h1>
                        <h2 className="balance">&nbsp;</h2>
                        <div className="tier">
                            <span className="milestone">10% </span>- 1000 $XRD
                            giveaway to a lucky holder
                        </div>
                        <div className="tier">
                            <span className="milestone">25% </span>- Meet-up in
                            Paris, France
                        </div>
                        <div className="tier">
                            <span className="milestone">50% </span>- DAO launch
                            (Decentralized Autonomous Organization)
                        </div>
                        <div className="tier">
                            <span className="milestone">75% </span>-
                            Commercialization of real-life merch
                        </div>
                        <div className="tier">
                            <span className="milestone">100% </span>-
                            Development of THE Radix NFT Marketplace
                        </div>
                    </div>
                    <div className="right">
                        <div className="twitter-feed">
                            <a
                                className="twitter-timeline"
                                data-width="400"
                                data-height="600"
                                data-theme="dark"
                                href="https://twitter.com/ScryptoPunks?ref_src=twsrc%5Etfw"
                            >
                                Tweets by ScryptoPunks
                            </a>
                        </div>
                    </div>
                </div>

                <div id="faq">
                    <h1>FAQ</h1>
                    <div className="faq-item" onClick={handleFAQClick}>
                        <div className="question">
                            When mint and what price?
                        </div>
                        <div className="answer">
                            ScryptoPunks were available starting on 01/14, for
                            50 $XRD, and sold out in less than 48h. Please refer
                            to the
                            <a href="#mint">Mint</a> section for more
                            information!
                        </div>
                    </div>
                    <div className="faq-item" onClick={handleFAQClick}>
                        <div className="question">What's the supply?</div>
                        <div className="answer">
                            10k, so every early Radix supporter get the chance
                            to own one.
                        </div>
                    </div>
                    <div className="faq-item" onClick={handleFAQClick}>
                        <div className="question">Who are you?</div>
                        <div className="answer">
                            The team is made of two developers. We have been
                            building projects on other Rust-based blockchains
                            such as Solana and Elrond for months. We have always
                            been disappointed by how assets and transactions
                            were handled, until we discovered Radix.
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}
