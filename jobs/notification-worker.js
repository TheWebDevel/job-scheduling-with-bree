const publicWorker = require("worker_threads");
const { sendEmail } = require("../nodemailer");

let { workerData } = publicWorker;
emailArgs = {
  email: workerData.email,
  subject: workerData.subject,
  body: workerData.body,
};

sendEmail(emailArgs);
