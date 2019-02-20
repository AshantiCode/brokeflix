import React from "react";
import axios from "../axios";

import YTSearch from "youtube-api-v3-search";

const API_KEY = "AIzaSyCdpPqr0fRxUemGn3zQjYFh-LPVYJdpfgA";
const options = {
    q: "full movie drama",
    part: "snippet",
    type: "video",
    maxResults: "10"
};

export default class Teaser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teasers: []
        };

        this.searchYT = this.searchYT.bind(this);
    }

    componentDidMount() {
        this.searchYT(options);
    }

    async searchYT(options) {
        try {
            const response = await YTSearch(API_KEY, options);
            console.log(response.items);
            let teasers = response.items;
            this.setState({
                teasers
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        if (this.state.teasers.length < 1) {
            return null;
        }
        const { teasers } = this.state;
        console.log("TEASERS in REnder:", teasers);

        const teaserList = (
            <div className="teasers-list">
                {teasers.map(teaser => {
                    return (
                        <div key={teaser.id} className="teaser-box">
                            <img src={teaser.snippet.thumbnails.medium.url} />
                            <p className="teaser-description">
                                {teaser.snippet.title}
                            </p>
                        </div>
                    );
                })}
            </div>
        );

        return (
            <div>
                <div className="teaser-list-container">{teaserList}</div>
            </div>
        );
    }
}
