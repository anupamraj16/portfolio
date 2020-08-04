const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });

const app = require("./app");

const port = process.env.PORT;

// Start Server
const server = app.listen(port, () => {
    console.log(`Server running at port ${port}...`);
});
