const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD,
        },
    })
);
res.redirect("/login");
return transporter.sendMail({
    to: email,
    from: "shop@node-complete.com",
    subject: "Signup succeeded!",
    html: "<h1>You successfully signed up!</h1>",
});
