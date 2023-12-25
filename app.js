const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/candidates");
const { startTokenRefreshing } = require("./accessToken");
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/api/", router);

app.listen(port, () => {
  console.log(
    `Server up and running on ${process.env.NODE_ENV} environment with port ${port} !`
  );
  startTokenRefreshing();
});
