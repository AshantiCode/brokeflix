import React from "react";
import Registration from "./components/registration";
import Login from "./components/login";
import { HashRouter, Route, Link } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
            <HashRouter>
                <section className="wrapper">
                    <a href="#">
                        <img
                            src="https://fontmeme.com/permalink/190218/69c7fd6e696a0cbacc1bb2f2f04beb57.png"
                            alt="netflix-font"
                            border="0"
                            className="logo"
                        />
                    </a>
                    <Link to="/login">
                        <button className="signin-button">Sign In</button>
                    </Link>
                    <div className="landing-wrapper">
                        <div className="landing-text-container">
                            <h1 className="landing-title">
                                Too broke for Netflix?{" "}
                            </h1>
                            <h2 className="landing-subtitle uppercase">
                                Watch movies for free
                            </h2>
                            <Link to="/register" className="no-link-styling">
                                <button className="register-button uppercase">
                                    Join now{" "}
                                </button>{" "}
                            </Link>
                        </div>
                        <div>
                            <Route path="/register" component={Registration} />
                            <Route path="/login" component={Login} />
                        </div>
                    </div>
                </section>
            </HashRouter>
        </div>
    );
}
