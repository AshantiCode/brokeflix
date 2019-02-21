import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

export default function Header(props) {
    return (
        <div className="header-container ">
            <img
                src=" https://fontmeme.com/permalink/190218/69c7fd6e696a0cbacc1bb2f2f04beb57.png"
                className="header-logo"
            />
            <div className="nav-flex-container">
                <nav>
                    <ul className="ul-flex-container">
                        <li>
                            <Link
                                to="/"
                                className="no-link-styling"
                                onClick={props.toggleActiveLink}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/movies"
                                className="no-link-styling"
                                onClick={props.toggleActiveLink}
                            >
                                Movies
                            </Link>
                        </li>
                        <li id="tv-show">
                            <Link
                                to="/shows"
                                className="no-link-styling"
                                onClick={props.toggleActiveLink}
                            >
                                TV-Shows
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/favorites"
                                className="no-link-styling"
                                onClick={props.toggleActiveLink}
                            >
                                Favorites
                            </Link>
                        </li>
                        
                    </ul>
                </nav>

                <nav>
                    <ul className="ul-flex-container">
                        <li>
                            <img />
                        </li>
                        <li>
                            {" "}
                            <a href="/logout" className="no-link-styling">
                                <p>Log Out</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
