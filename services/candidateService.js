const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
const {
  getCandidatesZoho,
  getCandidateZoho,
  addCandidatesZoho,
  getCandidatesSearchBarZoho,
  getLocationSearchBarZoho,
  deletedCandidatesZoho,
} = require("../zohoDb/zohoCandidateApis");
const {
  API_URL_SEARCH,
  API_DELETED_COUNT,
  API_URL_GET,
} = require("../utils/constants/constants");

const filterSearchcriteria = (query) => {
  const criteria = [];
  if (query.experience) {
    criteria.push(
      `experience:between:${query.experience.min}:${query.experience.max}`
    );
  }
  if (query.location) {
    criteria.push(`location:equals:${query.location}`);
  }
  if (query.salaryType) {
    criteria.push(`salaryType:equals:${query.salaryType}`);
  }
  if (query.education) {
    const { schoolInstitution, degree, fieldOfStudy } = query.education;
    if (schoolInstitution)
      criteria.push(`schoolInstitution:equals:${schoolInstitution}`);
    if (degree) criteria.push(`degree:equals:${degree}`);
    if (fieldOfStudy) criteria.push(`fieldOfStudy:equals:${fieldOfStudy}`);
  }
  if (query.availability) {
    const {
      noticePeriod,
      employmentType,
      immediateAvailability,
      onSite,
      relocate,
    } = query.availability;
    if (noticePeriod) criteria.push(`noticePeriod:equals:${noticePeriod}`);
    if (employmentType)
      criteria.push(`employmentType:equals:${employmentType}`);
    if (immediateAvailability)
      criteria.push(`immediateAvailability:equals:true`);
    if (onSite) criteria.push(`onSite:equals:true`);
    if (relocate) criteria.push(`relocate:equals:true`);
  }
  if (query.industryDomain) {
    criteria.push(`industryDomain:equals:${query.industryDomain}`);
  }
  if (query.certifications && query.certifications.length > 0) {
    const certificationsCriteria = query.certifications.map(
      (cert) => `certifications:equals:${cert}`
    );
    criteria.push(...certificationsCriteria);
  }
  if (query.itSkills && query.itSkills.length > 0) {
    const itSkillsCriteria = query.itSkills.map(
      (skill) => `itSkills:equals:${skill}`
    );
    criteria.push(...itSkillsCriteria);
  }
  if (query.diversity) {
    criteria.push(`diversity:equals:${query.diversity}`);
  }
  if (query.age) {
    criteria.push(`age:equals:${query.age}`);
  }
  if (query.lastActive) {
    criteria.push(`lastActive:equals:${query.lastActive}`);
  }
  const filterCriteria = criteria.join("and");
  return encodeURIComponent(filterCriteria);
};

const getCandidatesData = async (req, res) => {
  try {
    let query = req.body.profiles; //we have to make query here and process it in zohoCandidateAPI
    let str = ""; //{[...]}
    for (let key in query) {
      if (query[key] != "" && key.charAt(0) != "E") {
        str += `(${key.trim()}:contains:${query[key].trim()})and`;
      } else if (key.charAt(0) === "E" && query[key] != "") {
        str += `(${key.trim()}:equals:${query[key].trim()})`;
      }
    }
    query = str;
    const url = `${API_URL_SEARCH}?criteria=${encodeURIComponent(query)}`;
    const successResponse = await getCandidatesZoho(res, url); //function ending with zoho would make API calls
    return successResponse;
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const getCandidateData = async (req, res) => {
  try {
    const id = req.params.id;
    const url1 = `${API_URL_GET}/${id}`;
    const url2 = `${API_URL_GET}/${id}?fields=Educational_Details,Experience_Details_1,Experience_Details_2,Skills_Certification,Skills,Project_Details_1,Project_Details_2`;
    const successResponse = await getCandidateZoho(res, url1, url2);
    return successResponse; //function ending with zoho would make API calls
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const searchCandidateData = async (req, res) => {
  try {
    const candidates = await candidateService.searchCandidateZoho(req);
    return successResponse({ res, data: { candidates }, message: "Success" }); //function ending with zoho would make API calls
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const getFilteredData = async (req, res) => {
  try {
    const searchQuery = req.body;
    const criteria = filterSearchcriteria(searchQuery);
    const url = `${API_URL_SEARCH}?criteria=(${criteria})`;
    const candidates = await candidateService.getFilteredZoho(url);
    return successResponse({ res, data: { candidates }, message: "Success" }); //function ending with zoho would make API calls
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const getSortedCandidateData = async (req, res) => {
  try {
    const data = req.body;
    const url = `${API_URL_SEARCH}?sort_order_by=${data.sortOrder}&sortBy=${data.sortBy}`;
    // const candidates = await candidateService.getSortedCandidateZoho(req);
    // return successResponse ({res, data: { candidates }, message: 'Success'})//function ending with zoho would make API calls
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const getcandidateSearchBarData = async (req, res) => {
  try {
    const data = req.body;
    const searcH1 = `(Skill_Set:starts_with:${data.search})`;
    const url = `${API_URL_SEARCH}?criteria=${encodeURIComponent(searcH1)}`;
    const successResponse = await getCandidatesSearchBarZoho(res, url);
    return successResponse;
  } catch (error) {
    return errorResponse({ res, error });
  }
};
const getLocationSearchBarData = async (req, res) => {
  try {
    const data = req.body;
    const searcH1 = `(Current_Location:starts_with:${data.searchLocation})`;
    const url = `${API_URL_SEARCH}?criteria=${encodeURIComponent(searcH1)}`;
    const successResponse = await getLocationSearchBarZoho(res, url);
    return successResponse;
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const updateCandidatesData = async (req, res) => {
  try {
    const successResponse = await updateCandidatesZoho(res); //function ending with zoho would make API calls
    return successResponse;
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const deletedCandidatesData = async (req, res) => {
  try {
    const successResponse = await deletedCandidatesZoho(
      res,
      `${API_DELETED_COUNT}`
    ); //function ending with zoho would make API calls
    return successResponse;
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const addCandidatesData = async (req, res) => {
  try {
    const dataFromrequest = req.body; //JSON array[{},{},{},...]
    const dataTobeAdded = {};
    //Basic Info
    dataTobeAdded.First_Name = dataFromrequest.FirstName;
    if (dataFromrequest.MiddleName) {
      dataTobeAdded.Middle_Name = dataFromrequest.MiddleName;
    }
    dataTobeAdded.Last_Name = dataFromrequest.LastName;
    dataTobeAdded.Email = dataFromrequest.Email;
    const successResponse = await addCandidatesZoho(res, dataFromrequest); //function ending with zoho would make API calls
    return successResponse;
  } catch (error) {
    return errorResponse({ res, error });
  }
};
module.exports = {
  getCandidateData,
  getCandidatesData,
  searchCandidateData,
  getFilteredData,
  getSortedCandidateData,
  getcandidateSearchBarData,
  getLocationSearchBarData,
  updateCandidatesData,
  deletedCandidatesData,
  addCandidatesData,
};
