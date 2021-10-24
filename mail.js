require("dotenv").config();

const nodemailer = require("nodemailer");

const SMTP_HOST = process.env.SMTP_HOST || "error";
const SMTP_PORT = process.env.SMTP_PORT || "error";
const SMTP_USERNAME = process.env.SMTP_USERNAME || "error";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "error";
const SMTP_FROM = process.env.SMTP_FROM || "error";

exports.send = function (to, subject, html, callback) {
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });

  let message = {
    from: SMTP_FROM,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(message, function (err, info) {
    callback(err, info)
  });
};
