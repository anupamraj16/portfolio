const express = require("express");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const helmet = require("helmet");

const app = express();
app.enable("trust proxy");

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.SENDGRID_PASSWORD,
        },
    })
);

// GLOBAL MIDDLEWARES

// Set security HTTP Headers
app.use(helmet());

// Body-Parser. Reading data from body into req.body
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.post("/sendmail", async (req, res, next) => {
    await transporter.sendMail({
        to: "raj.anupam16@gmail.com",
        from: "raj.anupam16@gmail.com",
        subject: "You Got Mail from Portfolio",
        html: req.body.message,
    });
    res.redirect("/");
    next();
});

app.get("/", (req, res) => {
    res.redirect("/portfolio.html");
});

// Serve Static Files
app.use(express.static(`${__dirname}/public`));
// serves static files in public folder
// if a URL is not handled by any route handler, it goes to public folder

module.exports = app;
