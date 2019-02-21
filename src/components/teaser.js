import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

import YTSearch from "youtube-api-v3-search";

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
            q: `${this.props.genre}`,
            part: "snippet",
            type: "video",
            maxResults: "10"
        });
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
                    //cuts  i.e (subtitle Mexican) off
                    let title = teaser.snippet.title;
                    let pos = title.lastIndexOf("(");
                    title = title.substr(0, pos);

                    return (
                        <Link
                            to="/player"
                            onClick={() =>
                                this.props.setPlayerUrl(
                                    teaser.id.videoId,
                                    teaser.snippet.description,
                                    title
                                )
                            }
                        >
                            <div key={teaser.id} className="teaser-box">
                                <img
                                    src={teaser.snippet.thumbnails.medium.url}
                                />
                                <p className="teaser-description">{title}</p>
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
