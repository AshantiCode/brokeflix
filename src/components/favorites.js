import React from "react";
import axios from "../axios";

export default class Favorites extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favorites: []
        };
        this.getFavorites = this.getFavorites.bind(this);
    }

    componentDidMount() {
        this.getFavorites();
    }

    async getFavorites() {
        try {
            const response = await axios.get("/user/favorites");
            console.log("Response Favorite:", response);
            let favorites = response.data.favorites;

            this.setState({
                favorites
            });
        } catch (error) {}
    }

    render() {
        if (this.state.favorites.length < 1) {
            return null;
        }

        const { favorites } = this.state;
        console.log("Favorites in State: ", favorites);

        const baseUrl = "https://image.tmdb.org/t/p/w200";

        const favoritesList = (
            <div className="favorites-all">
                {favorites.map(favorite => {
                    return (
                        <div className="favorite-item">
                            <img src={`${baseUrl}${favorite.image}`} />
                            <p>{favorite.title}</p>
                        </div>
                    );
                })}
            </div>
        );

        return <div className="">{favoritesList}</div>;
    }
}
