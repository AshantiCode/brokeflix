import React from "react";

export default function Welcome() {
    return (
        <div>
            <section className="wrapper">
                <a href="#">
                    <img
                        src="https://fontmeme.com/permalink/190218/69c7fd6e696a0cbacc1bb2f2f04beb57.png"
                        alt="netflix-font"
                        border="0"
                        className="logo"
                    />
                </a>
                <div className="landing-text-container">
                    <h1 className="landing-title">Too broke for Netflix? </h1>
                    <h2 className="landing-subtitle">
                        Watch for movies for free
                    </h2>
                    <button className="register-button">JOIN NOW</button>
                </div>
            </section>
        </div>
    );
}
