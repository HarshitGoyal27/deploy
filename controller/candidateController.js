/* eslint-disable no-undef */
const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
const candidateService = require('../services/candidateService');
const axios=require('axios');
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
        const successResponse = await candidateService.searchCandidateData(req);
        return successResponse;
    } catch (error) {
        return errorResponse ({res, error})
    }
}
//this function
const getCandidates = async(req, res) => {
    try {
        console.log('A');
        const successResponse = await candidateService.getCandidatesData(req,res);
        return successResponse;
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getFilteredCandidates = async(req, res) => {
    try {
        console.log('reached here')
        console.log(req.body);
        const successResponse = await candidateService.getFilteredData(req,res);
        return successResponse
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getSortedCandidates = async(req, res) => {
    try {
        console.log('reachedd heree1');
        const successResponse = await candidateService.getSortedCandidateData(req);
        return successResponse 
    } catch (error) {
        return errorResponse ({res, error})
    }
}


const getcandidateSearchBar=async(req,res)=>{
    try{
        console.log('A');
        let successResponse=await candidateService.getcandidateSearchBarData(req,res);
        return successResponse;
    }
    catch(error){
        return errorResponse ({res, error})
    }
}

const getLocationSearchBar=async(req,res)=>{
    try{
        console.log('A');
        let successResponse=await candidateService.getLocationSearchBarData(req,res);
        return successResponse;
    }
    catch(error){
        return errorResponse ({res, error})
    }
}

const updateCandidates=async(req,res)=>{
    try{
        console.log('A');
        let successResponse=await candidateService.updateCandidatesData(req,res);
        return successResponse;
    }catch(error){
        return errorResponse ({res, error})
    }
}

const deletedCandidates=async(req,res)=>{
    try{
        console.log('A');
        let successResponse=await candidateService.deletedCandidatesData(req,res);
        return successResponse;
    }catch(error){
        return errorResponse ({res, error})
    }
}
module.exports = {
    getCandidate,
    getCandidatesBySearch, 
    getCandidates,
    getFilteredCandidates,
    getSortedCandidates,
    getcandidateSearchBar,
    getLocationSearchBar,updateCandidates,deletedCandidates
}

