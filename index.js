const express = require("express");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.get("/", (req, res, next) => {
     res.send("I am working!");
});

app.listen(5000, () => console.log("Listening to Port 5000"));
