import React from "react";
import Header from "./components/header";
import Teaser from "./components/teaser";
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
                    <Teaser />
                </div>
            </BrowserRouter>
        );
    }
}
