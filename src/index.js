const express = require("express");
require("./db/mongoose");
const imageRouter = require("./router/imageRouter");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(imageRouter);

app.listen(port, () => {
  console.log(`server is on ${port}`);
});
