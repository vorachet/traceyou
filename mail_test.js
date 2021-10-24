const mail = require("./mail");

const to = "vorachet@gmail.com";
const subject = "Test";
const html = "<p>Test</p>";

mail.send(to, subject, html, function (err, info) {
    console.log( err ? err : info)
})