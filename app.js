const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/candidates");
const { startTokenRefreshing } = require("./accessToken");
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const compression = require('compression');
const { allowCrossDomain } = require('./middlewares/cors/core.middleware');

app.use(cors());
app.use("/api/", router);
app.use(helmet());
app.use(compression());
app.use(allowCrossDomain);

app.listen(port, () => {
  console.log(
    `Server up and running on ${process.env.NODE_ENV} environment with port ${port} !`
  );
  startTokenRefreshing();
});
