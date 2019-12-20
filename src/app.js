const express = require("express");
const hbs = require("hbs");
const path = require("path");
const getgrid = require("./getgrid");
const getforcast = require("./getforcast");

const app = express();
const partialpath = path.join(__dirname, "../partials");
const viewpath = path.join(__dirname, "../views");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);

app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  const query = req.query;
  if (query.city) {
    getgrid(query.city, (error, data) => {
      if (error) {
        resData = { error: true, message: "Unable to locate the location" };
        res.send(resData);
        return console.log(data);
      } else {
        getforcast(
          data.longitude,
          data.lattitude,
          data.location,
          (error, data) => {
            if (error) {
              resData = {
                error: true,
                message: "Sorry unable to get the forcast"
              };
              res.send(resData);
              return console.log(data);
            } else {
              resData = { error: false, data: data };
              res.send(resData);
              console.log("Data sent successfully");
            }
          }
        );
      }
    });
  } else res.send({ error: true, message: "please enter a city name!" });
});

app.listen(port, () => {
  console.log("server listening at port " + port);
});
