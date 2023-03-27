const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
//const articleRouter = require("./routes/articles");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//app.use("/articles", articleRouter);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/BlogDB");
}

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Entry = mongoose.model("Entry", entrySchema);

const defEntry = Entry({
  title: "Welcome to blog website!",
  content: "Here, you can add enteries and write whatever you want to",
});

app.get("/", function (req, res) {
  Entry.find({}, function (err, results) {
    if (results.length === 0) {
      Entry.create(defEntry, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Default items added succesfullly!");
        }
      });
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const data = Entry({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  data.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:xyz", function (req, res) {
  posts.forEach(function (post) {
    if (_.lowerCase(req.params.xyz) === _.lowerCase(post.title)) {
      res.render("post", {
        title: post.title,
        text: post.postText,
      });
    }
  });
});

app.post("post", function (req, res) {
  const post = new Entry({
    title: req.body.postTitle,
    content: req.body.postContent,
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
