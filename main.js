require("dotenv").config();

const mail = require("./mail");
const express = require("express");
const geoip = require("geoip-lite");

const app = express();
app.set("trust proxy", true);

const port = 3000;
const SMTP_TO = process.env.SMTP_TO;

app.get("/", function (req, res) {
  const geo = geoip.lookup(req.ip);
  const qParams = JSON.stringify(req.query) || "undefined event";
  const event = [];
  const ip = req.ip;
  const device = req.headers["user-agent"];
  const country = geo ? geo.country : "Unknown country";
  const lang = req.headers["accept-language"];
  const region = geo ? geo.region : "Unknown";
  
  event.push("params: " + qParams);
  event.push("ip: " + ip);
  event.push("device: " + device);
  event.push("lang: " + lang);
  event.push("country: " + country);
  event.push("region: " + region);

  console.log(event);

  const subject = "visitor-info : " + qParams;
  const html = "<p>" + event.map(e=>e+'<br><br>').join("") + "</p>";

  mail.send(SMTP_TO, subject, html, function (err, info) {});
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
