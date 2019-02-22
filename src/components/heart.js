import React from "react";

export default function Heart(props) {
    let pic;

    if (props.favorite) {
        pic = "./assets/heart-filled.png";
    } else {
        pic = "./assets/heart-empty.png";
    }

    return (
        <img
            src={pic}
            onClick={() =>
                props.addToFavorite(
                    props.movieTitle,
                    props.movieId,
                    props.imgUrl
                )
            }
            className="favorite-heart"
        />
    );
}
