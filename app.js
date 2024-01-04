const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const router1 = require("./routes/candidates");
const router2 = require("./routes/clients");
const router3 = require("./routes/callSchedule");
const { startTokenRefreshing } = require("./accessToken");
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const compression = require('compression');
const { allowCrossDomain } = require('./middlewares/cors/core.middleware');

app.use(cors());
app.use("/api/", router1);
app.use("/apiclient/",router2);
app.use("/apicall/",router3)
app.use(helmet());
app.use(compression());
app.use(allowCrossDomain);

app.listen(port, () => {
  console.log(
    `Server up and running on ${process.env.NODE_ENV} environment with port ${port} !`
  );
  startTokenRefreshing();
});
