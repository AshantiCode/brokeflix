const express = require("express");
const app = express();
const ca = require("chalk-animation");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db");
const bcrypt = require("./bcrypt.js");

//  MIDDLEWARE  ===========================================

app.use(bodyParser.json());
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

app.use(express.static("./public"));
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// ROUTES     ==========================================

// REGISTER NEW USER

app.post("/welcome/register", function(req, res) {
    console.log("req.body Registration:", req.body);

    if (
        !req.body.first ||
        !req.body.last ||
        !req.body.email ||
        !req.body.password
    ) {
        res.json({
            success: false
        });
    } else {
        bcrypt
            .hash(req.body.password)
            .then(hashedPass => {
                return db.registerUser(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hashedPass
                );
            })
            .then(dbData => {
                console.log("Returned dbData: ", dbData.rows);
                req.session.userId = dbData.rows[0].id;
                req.session.name = `${dbData.rows[0].first} ${
                    dbData.rows[0].last
                }`;
                console.log("Req-session: ", req.session);
                res.json({
                    success: true
                });
            });
    }
});

// LOGIN
app.post("/welcome/login", function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    db.getUserByEmail(email).then(dbData => {
        // console.log("dbData: ", dbData.rows);
        const hashedPass = dbData.rows[0].hashedpass;

        req.session.userId = dbData.rows[0].id;
        req.session.name = `${dbData.rows[0].first} ${dbData.rows[0].last}`;

        // check password
        return bcrypt
            .comparePassword(password, hashedPass)
            .then(bool => {
                if (bool) {
                    res.json({
                        success: true
                    });
                } else {
                    req.session = null;
                    res.json({
                        success: false
                    });
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    });
});

// ADD FAVORITE MOVIES
app.post("/user/favorites", function(req, res) {
    console.log("Req.Body in Favorites:", req.body);
    // if(req.body.movie.favorite) {
    //     db.deleteFavoritMovie(movieTitle,imgUrl)
    // }
    const userId = req.session.userId;
    const movie = req.body.favoriteMovie;
    const imgUrl = req.body.favoriteMovieImgUrl;
    db.addFavoriteMovies(userId, movie, imgUrl);
    console.log("Added To Databse");
});

// GET FAVORITE MOVIES
app.get("/user/favorites", function(req, res) {
    const userId = req.session.userId;
    db.getFavoriteMovies(userId).then(dbData => {
        console.log("dbData.rows.[0]:", dbData.rows[0]);

        let favorites = dbData.rows.filter(favorite => {
            return favorite.title != null && favorite.image != null;
        });
        res.json({
            favorites
        });
    });
});

// LOGOUT
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

//THESE 2 ALWAYS WILL COME LAST   ===========================================
app.get("/welcome", function(req, res) {
    console.log("reqSession:", req.session);
    console.log("If/Else running?");
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    console.log("Star running?");
    console.log("reqSession in STAR:", req.session);
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// SERVER   ================================================
app.listen(8080, function() {
    ca.rainbow("I'm listening on Port 8080");
});
