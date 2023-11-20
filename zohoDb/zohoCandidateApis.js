const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
import axios from "axios";


const getCandidatesZoho = async (url) => {
  try {
    const candidates = await axios.get(url, {
      headers: {
        Authorization: "Zoho-oauthtoken YOUR_ZOHO_AUTH_TOKEN", 
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

module.exports = {
    getCandidatesZoho,
};
