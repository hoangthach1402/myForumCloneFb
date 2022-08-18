const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes");
require("dotenv").config();
const path = require("path");
const ejsEngine = require("ejs-mate");
var cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

mongoose.connect(
  "mongodb+srv://hoangthach1402:hoangthach123@cluster0.mmtet.mongodb.net/gaito?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());
app.use(methodOverride("_method"));
app.engine("ejs", ejsEngine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use("/", router);

app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("notfound", { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});
app.listen(PORT, () => console.log(`Welcome Gaito API ${PORT}!`));
