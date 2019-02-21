import React from "react";
import axios from "../axios";

export default class TvShows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: []
        };
    }

    componentDidMount() {
        this.getTvShows();
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
        if ()
    }
}
