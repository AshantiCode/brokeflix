import React from "react";
import Header from "./components/header";
import Teaser from "./components/teaser2";
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
                    <Teaser genre={"full movie drama"} category={"Drama"} />
                    {/* <Teaser genre={"full movie comedy"} category={"Comedy"} />
                    <Teaser genre={"full movie action"} category={"Action"} />
                    <Teaser genre={"full movie romance"} category={"Romance"} />
                    <Teaser
                        genre={"full movie for kids"}
                        category={"For Kids"}
                    />
                    <Teaser genre={"full movie family"} category={"Family"} /> */}
                    <Route path="/player" component={player} />
                </div>
            </BrowserRouter>
        );
    }
}
