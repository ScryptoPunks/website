import React, { useEffect, useState } from "react";
import "./index.css";

export default function Home() {
    const phrase = "Join the revolution.";
    const [index, setIndex] = useState(0);

    const handleFAQClick = (e) => {
        e.stopPropagation();
        console.log(e.target);
        e.target.classList.toggle("active");
    };

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
                <div className="learn-more">
                    <a href="#mint">Reserve now</a>
                </div>
            </div>
            <div className="main-container">
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
                            <img src="assets/square.png" alt="gallery" />
                        </div>
                    </div>
                </div>

                <div id="mint">
                    <div className="mint-container">
                        <div className="left">
                            <img src="assets/mint.gif" alt="" />
                        </div>
                        <div className="right">
                            <h1>MINT</h1>
                            <div className="text">
                                While waiting for the Babylon release, scheduled
                                for late 2022, you can reserve yours
                                ScryptoPunks by sending XRD to the official
                                ScryptoPunks wallet. The price of an NFT is 50
                                XRD, and you can only buy a maximum of 250 of
                                them. In exchange, some SPUNKS tokens will be
                                sent to your wallet.
                                <br />
                                <br />
                                Once Babylon is live, we will deploy our Smart
                                Contract & minting dApp. This will allow you to
                                connect your wallet and trade your SPUNKS token
                                to mint randomly selected NFTs!
                            </div>
                            <div className="mint-address">
                                <h3>Wallet address:</h3>
                                <div className="address-container">
                                    <div className="address">
                                        rdx1qspsswum8q6k3v6yawvahwjzxga2gzt5jtnfjnckvmrvgemkp0asnvq8d77xv
                                    </div>
                                    <button>Copy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="roadmap">
                    <div className="left">
                        <h1>ROADMAP</h1>
                        {/* <h2 className="balance">&nbsp;</h2> */}
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
                            ScryptoPunks will be available when the Babylon
                            release hits, but you can reserve them from now on!
                            The price is 50 XRD per NFT as we wanted to make it
                            affordable for everyone. Please refer to the
                            <a href="#mint">Mint</a> section for more
                            information!
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="question">What's the max supply?</div>
                        <div className="answer">
                            Like the OG Cryptopunks collection, there will only
                            be 10k Punks, not a single one more!
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="question">
                            I sent XRD but still haven't received any SPUNKS
                            token?
                        </div>
                        <div className="answer">
                            Please note that the process of sending SPUNKS
                            tokens is done manually, so it can take up to 24h
                            before arriving in your wallet.
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="question">Who are you?</div>
                        <div className="answer">
                            The team is made of two developers. We have been
                            creating projects for months, on others Rust-based
                            blockchains such as Solana or Elrond, but have never
                            been satisfied by the technology, until we
                            discovered Radix. We immediately felt in love with
                            the ecosystem and started building ScryptoPunks.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
