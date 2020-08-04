const express = require("express");

const helmet = require("helmet");

const app = express();

// GLOBAL MIDDLEWARES

// Set security HTTP Headers
app.use(helmet());

// Body-Parser. Reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
    res.redirect("/portfolio.html");
});

// Serve Static Files
app.use(express.static(`${__dirname}/public`));
// serves static files in public folder
// if a URL is not handled by any route handler, it goes to public folder

module.exports = app;
