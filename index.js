const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  moment = require("moment");
const nodemailer = require("./nodemailer");
const { scheduleJob } = require("./bree");

// support parsing of application/json type post data
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  return res.json({ response: "It Worked!" });
});

app.post("/send-email", async (req, res) => {
  emailArgs = {
    email: req.body.email,
    subject: "Hello, World!",
    body: "<p>Hello, World!</p>",
  };
  let emailLink = await nodemailer.send(emailArgs);
  return res.json({
    response: `Preview URL: ${emailLink}`,
  });
});

app.post("/book-ticket", async (req, res) => {
  let args = {
    jobName: "sendEmail",
    time: moment().add(10, "seconds").toDate(),
    params: {
      email: req.body.email,
      subject: "Booking Confirmed",
      body: "Your booking is confirmed!!",
    },
  };
  scheduleJob(args);

  // Schedule Job to send email 10 minutes before the movie
  movieTime = moment.unix(req.body.start_time);
  args = {
    jobName: "sendEmail",
    time: movieTime.subtract(10, "minutes").toDate(),
    params: {
      email: req.body.email,
      subject: "Movie starts in 10 minutes",
      body:
        "Your movie will start in 10 minutes. Hurry up and grab your snacks.",
    },
  };
  scheduleJob(args);

  // Return a response
  return res.status(200).json({ response: "Booking Successful!" });
});

app.listen(8080, () => console.log(`Hey there! I'm listening.`));
