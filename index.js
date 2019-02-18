const express = require("express");
const app = express();
const ca = require("chalk-animation");
const compression = require("compression");

//  MIDDLEWARE  ===========================================
app.use(express.static("./public"));
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
//THIS WILL COME LAST
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// SERVER   ================================================
app.listen(8080, function() {
    ca.rainbow("I'm listening on Port 8080");
});
