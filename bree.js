const Bree = require("bree");

let scheduleJob = (data) => {
  const bree = new Bree({
    jobs: [
      {
        name: "notification-worker",
        date: data.time,
        worker: {
          workerData: data.params,
        },
      },
    ],
  });

  bree.start("notification-worker");
};

module.exports = {
  scheduleJob,
};
