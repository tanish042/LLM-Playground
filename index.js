import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(bodyParser.urlencoded({ extended: true }));

let yourBearerToken = "";

app.get("/", (req, res) => {
    res.render("index.ejs");
});
  
app.get("/sign-up", async (req, res) => {
    res.render("signup.ejs", { content: "SIGN UP" });
});

  app.post("/register-user", async (req, res) => {
    try {
      const result = await axios.post(API_URL + "/register",req.body);
      res.redirect("/login");
    } catch (error) {
      res.render("signup.ejs", { content: JSON.stringify(error.response.data.error) });
    }
});

app.get("/login", async (req, res) => {
  
  res.render("signin.ejs", { passed: "True", content: "SIGN IN" });
  
});

app.get("/sign-in", async (req, res) => {
    res.render("signin.ejs", { passed: "False", content: "SIGN IN" });
});

let idName = "";

  app.post("/get-token", async (req, res) => {
    try {
      const result = await axios.post(API_URL + "/get-auth-token",req.body);
      yourBearerToken = "";
      yourBearerToken = yourBearerToken + result.data.token;
      idName = req.body.username;
      res.redirect("/user");
    } catch (error) {
      res.render("signin.ejs", { passed: "False", content: JSON.stringify(error.response.data.error) });
    }
});

app.get("/user", (req, res) => {
  res.render("mainpage.ejs", { userName: idName });
});

app.get("/history", (req, res) => {
  res.render("history.ejs", { userName: idName });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });















  
