import React from "react";
import axios from "../axios";
import Movies from "./movies";

export default class TvShows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: [],
            video: "",
            favorte: false
        };
    }

    componentDidMount() {
        // this.getTvShows();
    }

    async getTvShows() {
        try {
            let response = await axios.get(
                "https://api.themoviedb.org/3/tv/popular?api_key=001da56e3b0ee5e6e11f8a1859a5e054&language=en-US&page=1"
            );
            // console.log("Responies TV SHows:", response);
            const shows = response.data.results;
            this.setState({
                shows
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        if (this.state.shows.length < 1) {
            return null;
        }

        const { shows } = this.state;
        const baseUrl = "https://image.tmdb.org/t/p/w200";

        const showList = (
            <div>
                {shows.map(show => {
                    return (
                        <div key={show.id} className="item-card">
                            <img src={`${baseUrl}${show.poster_path}`} />
                            <div className="item-details">
                                <h2 className="item-title">{show.name}</h2>
                                <p className="item-description">
                                    {show.overview}
                                </p>
                                <p className="item-voting">
                                    {show.vote_average}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
        return <div className="item-list">{showList}</div>;
    }
}
