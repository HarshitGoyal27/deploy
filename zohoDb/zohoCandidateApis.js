const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
const axios = require("axios");
const { getAccess } = require("./zohoAuthToken");
const { API_URL_GET } =  "../utils/constants/constants";
const newAccessToken = () => {
  process.env.ACCESS_TOKEN = getAccess();
};

const getRequiredFields = (C_data) => {
  return C_data.data.map((ele) => ({
    Name: ele.Full_Name,
    Email: ele.Email,
    Skills: ele.Skill_Set,
    id: ele.id,
    Experience: ele.Experience_in_Years,
    PreviousRole: ele.Previous_Role,
    CurrentRole: ele.Current_Role,
    CandidateProfile: ele.Candidate_Profile,
    Salary: ele.Salary,
    PrefferedLocation: ele.Preferred_Location,
    CurrentLocation: ele.Current_Location,
  }));
};

const getCandidatesZoho = async (res, url) => {
  newAccessToken();
  try {
    const candidates = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
      params: {
        per_page: 5,
        page: 1,
      },
    });
    if (candidates.data != "") {
      const candidatesData = getRequiredFields(candidates.data);
      return successResponse({
        res,
        data: { candidatesData },
        message: "Success",
      });
    } else {
      return successResponse({
        res,
        data: { candidatesData: "Data not present" },
        message: "Success",
      });
    }
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const getCandidateZoho = async (res, url1, url2) => {
  newAccessToken();
  try {
    const candidates = await axios.get(url1, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
    });
    const tabular = await axios.get(url2, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
    });
    if (candidates.data != "") {
      const candidatesData = getRequiredFields(candidates.data);
      candidatesData.push(tabular.data.data[0]);
      return successResponse({
        res,
        data: { candidatesData },
        message: "Success",
      });
    } else {
      return successResponse({
        res,
        data: { candidatesData: "Data not present" },
        message: "Success",
      });
    }
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const searchCandidateZoho = async (url) => {
  newAccessToken();
  try {
    const candidates = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const getFilteredZoho = async (url) => {
  newAccessToken();
  try {
    const candidates = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
};
const getSortedCandidateZoho = async (url) => {
  newAccessToken();
  try {
    const candidates = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const addCandidatesZoho = async (res, data) => {
  newAccessToken();
  try {
    await axios.post(`${API_URL_GET}`, data, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
    });
    return successResponse({
      res,
      data: "Candidates added Succesfully",
      message: "Success",
    });
  } catch (err) {
    return errorResponse({ res, err });
  }
};

const getCandidatesSearchBarZoho = async (res, url) => {
  newAccessToken();
  try {
    const resp1 = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
      params: {
        per_page: 5,
        page: 1,
      },
    });
    const arr = resp1.data.data;
    if (arr === undefined) {
      return successResponse({ res, data: searchSkills, message: "Success" });
    }
    const searchSkills = arr.map((ele) => {
      const skill = ele.Skill_Set.match(/^[^,]*/);
      return skill[0];
    });
    const uniqueSkills = [...new Set(searchSkills)];
    return successResponse({ res, data: uniqueSkills, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const getLocationSearchBarZoho = async (res, url) => {
  newAccessToken();
  try {
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
      params: {
        per_page: 5,
        page: 1,
      },
    });
    const arr = resp.data.data;
    const searchLocation = [];
    if (arr === undefined) {
      return successResponse({ res, data: searchLocation, message: "Success" });
    }
    searchLocation = arr.map((ele) => {
      const location = ele.Current_Location;
      return location;
    });
    const uniqueLocations = [...new Set(searchLocation)];

    return successResponse({ res, data: uniqueLocations, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const updateCandidatesZoho = async (res) => {};

const deletedCandidatesZoho = async (res, url) => {
  newAccessToken();
  try {
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
      },
    });
    return successResponse({ res, data: resp.data, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
};
module.exports = {
  getCandidatesZoho,
  getCandidateZoho,
  searchCandidateZoho,
  getFilteredZoho,
  getSortedCandidateZoho,
  addCandidatesZoho,
  getCandidatesSearchBarZoho,
  getLocationSearchBarZoho,
  deletedCandidatesZoho,
};
