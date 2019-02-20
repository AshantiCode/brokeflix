import React from "react";
import Header from "./components/header";
import Teaser from "./components/teaser";
import Carousel from "./components/carousel2";
import VideoPlayer from "./components/videoPlayer";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.setPlayerUrl = this.setPlayerUrl.bind(this);
    }

    setPlayerUrl(url) {
        this.setState({
            playerUrl: url
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-background">
                    <Header />

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div>
                                <Carousel />
                                <Teaser
                                    setPlayerUrl={this.setPlayerUrl}
                                    genre={"full movie drama"}
                                    category={"Drama"}
                                />
                                {/* <Teaser genre={"full movie comedy"} category={"Comedy"} />
                        <Teaser genre={"full movie action"} category={"Action"} />
                        <Teaser genre={"full movie romance"} category={"Romance"} />
                        <Teaser
                            genre={"full movie for kids"}
                            category={"For Kids"}
                        />
                        <Teaser genre={"full movie family"} category={"Family"} />  */}
                            </div>
                        )}
                    />

                    <Route
                        exact
                        path="/player"
                        render={() => {
                            return (
                                <VideoPlayer playerUrl={this.state.playerUrl} />
                            );
                        }}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
