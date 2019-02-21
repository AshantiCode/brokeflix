import React from "react";
import axios from "../axios";
import Heart from "./heart";

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };

        this.getMovies = this.getMovies.bind(this);
        // this.toggleFavorite = this.toggleFavorite.bind(this);
        this.addToFavorite = this.addToFavorite.bind(this);
        this.saveFavorite = this.saveFavorite.bind(this);
    }

    componentDidMount() {
        // this.getMovies();
    }

    async getMovies() {
        try {
            let response = await axios.get(
                "https://api.themoviedb.org/3/trending/movie/week?api_key=001da56e3b0ee5e6e11f8a1859a5e054"
            );
            // console.log("Response MovieDB:", response);
            const movies = response.data.results;
            this.setState({
                movies
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    addToFavorite(video) {
        this.setState({
            video,
            favorite: !this.state.favorite
        });

        this.saveFavorite(video);
    }

    async saveFavorite() {
        try {
            const response = await axios.post("/user/favorites", {
                video: this.state.video
            });
            console.log("response Love:", response);
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        if (this.state.movies.length < 1) {
            return null;
        }
        const { movies } = this.state;
        const baseUrl = "https://image.tmdb.org/t/p/w200";
        // console.log("STATE Movies:", movies);
        const movieList = (
            <div>
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="item-card">
                            <img src={`${baseUrl}${movie.poster_path}`} />
                            <div className="item-details">
                                <h2 className="item-title">{movie.title}</h2>
                                <Heart
                                    onClick={this.addToFavorite(movie.id)}
                                    favorite={this.state.favorite}
                                />
                                <p className="item-description">
                                    {movie.overview}
                                </p>
                                <p className="item-voting">
                                    {movie.vote_average}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );

        return <div className="item-list">{movieList}</div>;
    }
}
