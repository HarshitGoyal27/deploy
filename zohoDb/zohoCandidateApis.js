const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
const axios =require("axios");

const scope = 'ZohoRECRUIT.modules.all';

const criteria = 'Skills:equals:SA[';
const accessToken = '...xyz'; // Replace with your actual access token
//hitting this method:
const getCandidatesZoho = async (urL) => {
  try {
    //console.log('ZOHO FN',url);//till here okay
    const url = `https://recruit.zoho.in/recruit/v2/Candidates/search?criteria=${encodeURIComponent(criteria)}`;
    const candidates = await axios.get(url, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      }
    });
    console.log('AAAAAA');
    console.log(candidates);
    
  } catch (error) {
    console.log(error);
    return errorResponse({ res, error });
  }
};
//////:
const getCandidateZoho = async (url) => {
  try {
    const candidates = await axios(url, {
      headers: {
        Authorization: "Zoho-oauthtoken YOUR_ZOHO_AUTH_TOKEN", 
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const searchCandidateZoho=async(url)=>{
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
}
const getFilteredZoho=async(url)=>{
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
}
const getSortedCandidateZoho=async(url)=>{
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
}



module.exports = {
    getCandidatesZoho,getCandidateZoho,searchCandidateZoho,getFilteredZoho,getSortedCandidateZoho
};
