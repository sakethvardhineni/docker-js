const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true })); // To parse json data in req.body

app.use(express.static(path.join(__dirname, "public")));

const { User } = require("./app"); // Importing the model
// We are exporting the User in an object in app.js, so we should import in object format here.

// Login page get request
app.get("/", (req, res) => {
  res.render("login.ejs");
});

// Login page post request
app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user && user.password === password) {
    // req.session.username = username;
    res.send("you have logged in");
  } else {
    res.redirect("/login");
  }
});

//Sign up page get request
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

//Sign up page post request
app.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  const user = new User({
    username: username,
    password: password,
  });
  await user.save();
  res.render("login.ejs");
});

// Port Establishment
app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
