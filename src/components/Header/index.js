import "./index.css";

export default function Header() {
    return (
        <header>
            <div>
                <a href="https://scryptopunks.com" className="logo">
                    SCRYPTO PUNKS
                </a>
            </div>
            <nav>
                <a href="#about">ABOUT</a>
                <a href="#mint">MINT</a>
                <a href="#roadmap">ROADMAP</a>
                <a href="#faq">FAQ</a>
            </nav>
            <div>
                <a
                    target="_blank"
                    href="https://twitter.com/ScryptoPunks"
                    rel="noreferrer"
                >
                    TWITTER
                </a>
            </div>
        </header>
    );
}