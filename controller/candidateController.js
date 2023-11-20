/* eslint-disable no-undef */
const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
const candidateService = require('../services/candidateService');

const getCandidate = async(req, res) => {
    try {
        const candidates = await candidateService.getCandidateData(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getCandidatesBySearch = async(req, res) => {
    try {
        const candidates = await candidateService.searchCandidateData(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getCandidates = async(req, res) => {
    try {
        const candidates = await candidateService.getCandidatesData(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getFilteredCandidates = async(req, res) => {
    try {
        const candidates = await candidateService.getFilteredData(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getSortedCandidates = async(req, res) => {
    try {
        const candidates = await candidateService.getSortedCandidateData(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}



module.exports = {
    getCandidate,
    getCandidatesBySearch,
    getCandidates,
    getFilteredCandidates,
    getSortedCandidates,
}
