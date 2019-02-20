import React from "react";
// import Player from "./component/player";
import axios from "../axios";
import { Link } from "react-router-dom";

import search from "youtube-search";

const API_KEY = "AIzaSyBTB5tzRBATe1r4_VjQShi9jGyTRd6YfwM";

export default class Teaser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teasers: []
        };

        this.searchYT = this.searchYT.bind(this);
    }

    componentDidMount() {
        this.searchYT({
            maxResults: "1",
            key: "AIzaSyBTB5tzRBATe1r4_VjQShi9jGyTRd6YfwM"
        });
    }

    async searchYT(options) {
        try {
            const response = await search(`${this.props.genre}`, options);
            console.log("REsponse:", response);
            let teasers = response.results;
            this.setState({
                teasers
            });
            return;
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        if (this.state.teasers.length < 1) {
            return null;
        }
        const { teasers } = this.state;
        console.log("TEASERS in Render:", teasers);

        const teaserList = (
            <div className="teasers-list">
                {teasers.map(teaser => {
                    return (
                        <Link
                            to="/player"
                            onClick={() => this.props.setPlayerUrl(teaser.link)}
                        >
                            <div key={teaser.id} className="teaser-box">
                                <img src={teaser.thumbnails.medium.url} />
                                <p className="teaser-description">
                                    {teaser.title}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );

        return (
            <div>
                <div className="teaser-list-container">
                    <p>{this.props.category}</p>
                    {teaserList}
                </div>
            </div>
        );
    }
}
