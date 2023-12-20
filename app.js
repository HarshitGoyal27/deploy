require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/candidates");
const cluster = require("cluster");
const { Worker } = require("worker_threads");
const numCPUs = require("os").cpus().length;
const port = process.env.PORT || 3000;
app.use(cors());
app.use("/api/", router);
let token='';
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("listening", (worker, address) => {
    console.log(`A worker is now connected to ${address.address}:${address.port}`);
  });

  cluster.on("disconnect", (worker) => {
    console.log(`The worker #${worker.id} has disconnected`);
  });
  
} 
else {
  app.listen(port, () =>
    console.log(`Server up and running on ${process.env.NODE_ENV} environment with port ${port} !`)
  );
  console.log(`Worker ${process.pid} started`);

}