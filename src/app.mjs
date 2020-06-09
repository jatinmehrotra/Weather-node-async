import express from "express";
import path from "path";
import hbs from "hbs";
import geocode from "./utils/geocode.mjs";
import forecast from "./utils/forecast.mjs";
import dotenv from "dotenv";


const app = express();

let port = process.env.PORT || 3000;

dotenv.config();
let str =
  import.meta.url;
str = str.substring(7);
console.log(str);

//setting up partials and views path
let publicDirectoryPath = path.join(str, "../../public");
let viewsPath = path.join(str, "../../templates/views");
let partialsPath = path.join(str, "../../templates/partials");

//configuring express and hbs where to look for views directory and partials.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup setup directory to serve.
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Wanna find temperature? Surely you will.",
    age: 20,
    name: "jatin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "this is jatin",
    name: "jatin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "this is help",
    name: "jatin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide address",
    });
  }
  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({
        error: error
      });
    }
    let {
      latitude: lat,
      longitude: long,
      location
    } = response;

    forecast(lat, long, (error, forecastResponse) => {
      if (error) {
        res.send({
          error: error
        });
      }
      res.send({
        Location: location,
        Forecast: forecastResponse,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "page not found",
  });
});

app.listen(port, () => {
  console.log("server is up and running on port ", port);
});