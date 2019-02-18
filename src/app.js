import React from "react";
import Header from "./components/header";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-background">
                    <Header />
                    {/* <a href="/logout" className="link">
                        <p>Log Out</p>
                    </a> */}
                </div>
            </BrowserRouter>
        );
    }
}
