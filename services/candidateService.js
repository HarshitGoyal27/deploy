const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
import { getCandidatesZoho } from '../zohoDb/zohoCandidateApis';
import { API_URL } from '../utils/constants/constants';

const buildSearchCriteria = (query) => {
    const skillsCriteria = query.skills
      .map((skill) => `Skills:equals:${skill}`)
      .join("and");
    const designationCriteria = `Designation:equals:${query.designation}`;
    const allCriteria = [skillsCriteria, designationCriteria].join("and");
    return encodeURIComponent(allCriteria);
  }

const getCandidatesData = async (req) => {
    try {
        const searchQuery = req.body;
        const criteria = buildSearchCriteria(searchQuery);
        const url = `${API_URL}?criteria=${criteria}`;
        const candidates = await getCandidatesZoho(url);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getCandidateData = async(req, res) => {
    try {
        const candidates = await candidateService.getCandidateZoho(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const searchCandidateData = async(req, res) => {
    try {
        const candidates = await candidateService.searchCandidateZoho(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getFilteredData = async(req, res) => {
    try {
        const candidates = await candidateService.getFilteredZoho(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getSortedCandidateData = async(req, res) => {
    try {
        const candidates = await candidateService.getSortedCandidateZoho(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

module.exports = {
    getCandidateData,
    getCandidatesData,
    searchCandidateData,
    getFilteredData,
    getSortedCandidateData,
}
