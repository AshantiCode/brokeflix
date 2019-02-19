import React from "react";
import Header from "./components/header";
import Teaser from "./components/teaser";
import Carousel from "./components/carousel2";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import Sticky from "react-stickynode";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-background">
                    <Sticky enabled={true} top={10} bottomBoundary={1200}>
                        <Header />
                    </Sticky>
                    <Carousel />
                    <Teaser />
                </div>
            </BrowserRouter>
        );
    }
}
