require("dotenv").config();
const axios = require("axios");
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshtoken = process.env.REFRESH_TOKEN;

const getAuthTokenusingReferesh = async () => {
  try {
    const resp = await axios.post(
      `https://accounts.zoho.in/oauth/v2/token?refresh_token=${refreshtoken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`
    );
    process.env.ACCESS_TOKEN = resp.data.access_token;
  } catch (err) {
    console.log("errrorr", err);
  }
};

const getAccess = () => {
  return process.env.ACCESS_TOKEN;
};

module.exports = { getAccess, getAuthTokenusingReferesh };