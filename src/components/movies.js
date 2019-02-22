import React from "react";
import axios from "../axios";
import Heart from "./heart";

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };

        // this.getMovies = this.getMovies.bind(this);
        // this.toggleFavorite = this.toggleFavorite.bind(this);
        this.addToFavorite = this.addToFavorite.bind(this);
        this.saveFavorite = this.saveFavorite.bind(this);
    }

    componentDidMount() {
        this.getMovies();
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
            console.log("State Movies:", this.state.movies);
        } catch (error) {
            console.log(error.message);
        }
    }

    addToFavorite(movieTitle, movieId, imgUrl) {
        let newMovies = this.state.movies.map(movie => {
            if (movie.id == movieId) {
                console.log("I am Running!");
                movie.favorite = true;
                return movie;
            } else {
                return movie;
            }
        });
        console.log("New Movie: ", newMovies);
        this.setState({
            movies: newMovies,
            favoriteMovie: movieTitle,
            favoriteMovieImgUrl: imgUrl
        });

        this.saveFavorite();
    }

    async saveFavorite() {
        try {
            const response = await axios.post("/user/favorites", {
                favoriteMovie: this.state.favoriteMovie,
                favoriteMovieImgUrl: this.state.favoriteMovieImgUrl
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
                        <div className="item-card">
                            <img src={`${baseUrl}${movie.poster_path}`} />
                            <div className="item-details">
                                <Heart
                                    addToFavorite={this.addToFavorite}
                                    movieId={movie.id}
                                    movieTitle={movie.title}
                                    imgUrl={movie.poster_path}
                                    favorite={movie.favorite}
                                />
                                <h2 className="item-title">{movie.title}</h2>

                                <p className="item-description">
                                    {movie.overview}
                                </p>
                                <p className="item-voting">
                                    Rating: <span>{movie.vote_average}</span>
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
