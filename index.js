const express = require("express");
const app = express();
const { dbConnection } = require("./config/config");
const { handleTypeError } = require("./middlewares/errors.js");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/users", require("./routes/users.js"));
app.use("/posts", require("./routes/posts.js"));
app.use("/comments", require("./routes/comments.js"));

app.use(handleTypeError)
dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));