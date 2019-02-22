let spicedPg = require("spiced-pg");
let db;

// if (true) then website shoult talk to herokus database.
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // if we are on 8080
    const { dbUser, dbPass } = require("./secrets");
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/brokeflix`);
}

// SETUP  END ===============================================

// REGISTER A NEW USER
module.exports.registerUser = (first, last, email, hashedPass) => {
    return db.query(
        `INSERT INTO users (first, last, email, hashedpass) VALUES ($1, $2, $3, $4) RETURNING id, first, last`,
        [first, last, email, hashedPass]
    );
};

//USER LOGIN
module.exports.getUserByEmail = email => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

// ADD FAVORITE MOVIE
module.exports.addFavoriteMovies = (userId, movie, image) => {
    return db.query(
        `INSERT INTO favorites (user_id, movie_title, image_url) VALUES ($1, $2, $3) `,
        [userId, movie, image]
    );
};

//GET FAVORITE MOVIES
module.exports.getFavoriteMovies = userId => {
    return db.query(
        `SELECT favorites.movie_title as title, favorites.image_url as image 
        FROM favorites 
        LEFT JOIN users
        ON favorites.user_id = users.id
        WHERE users.id = $1`,
        [userId]
    );
};
