import React from "react";
import axios from "../axios";
import HorizontalScroll from "react-scroll-horizontal";

// const API_KEY = AIzaSyCdpPqr0fRxUemGn3zQjYFh - LPVYJdpfgA;

export default class Teaser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teasers: []
        };

        this.getChannels = this.getChannels.bind(this);
    }

    componentDidMount() {
        this.getChannels();
    }

    async getChannels() {
        try {
            const response = await axios.get(
                "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLsZQnDqnebk4kN-oGYb2JmTU0ofZHqZTg&key=AIzaSyCdpPqr0fRxUemGn3zQjYFh-LPVYJdpfgA"
            );

            console.log("Response von search.list:", response);
            var teasers = response.data.items;
            console.log("teasers:", teasers);
            this.setState({
                teasers
            });
            console.log("State:", this.state);
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
                <div>{teaserList}</div>
            </div>
        );
    }
}
