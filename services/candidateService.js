const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
const { getCandidatesZoho,getCandidateZoho,searchCandidateZoho,getFilteredZoho,getSortedCandidateZoho}=require('../zohoDb/zohoCandidateApis');
const { API_URL } =require ('../utils/constants/constants');

const buildSearchCriteria = (query) => { 
    const skillsCriteria = query.skills
      .map((skill) => `Skill_set:contains:${skill}`)
      .join("and");
    console.log(allCriteria)
    return encodeURIComponent(allCriteria);
}

const filterSearchcriteria=(query)=>{
    const criteria = [];
    if (query.experience){
        criteria.push(`experience:between:${query.experience.min}:${query.experience.max}`);
    }
    if (query.location){
        criteria.push(`location:equals:${query.location}`);
    }
    if (query.salaryType){
        criteria.push(`salaryType:equals:${query.salaryType}`);
    }
    if (query.education){
        const { schoolInstitution, degree, fieldOfStudy } = query.education;
        if (schoolInstitution) criteria.push(`schoolInstitution:equals:${schoolInstitution}`);
        if (degree) criteria.push(`degree:equals:${degree}`);
        if (fieldOfStudy) criteria.push(`fieldOfStudy:equals:${fieldOfStudy}`);
    }
    if (query.availability){
        const{noticePeriod,employmentType,immediateAvailability,onSite,relocate}=query.availability;
        if (noticePeriod) criteria.push(`noticePeriod:equals:${noticePeriod}`);
        if (employmentType) criteria.push(`employmentType:equals:${employmentType}`);
        if (immediateAvailability) criteria.push(`immediateAvailability:equals:true`);
        if (onSite) criteria.push(`onSite:equals:true`);
        if (relocate) criteria.push(`relocate:equals:true`);
    }
    if (query.industryDomain){
        criteria.push(`industryDomain:equals:${query.industryDomain}`);
    }
    if (query.certifications && query.certifications.length > 0){
        const certificationsCriteria = query.certifications.map(cert => `certifications:equals:${cert}`);
        criteria.push(...certificationsCriteria);
    }
    if (query.itSkills && query.itSkills.length > 0){
        const itSkillsCriteria = query.itSkills.map(skill => `itSkills:equals:${skill}`);
        criteria.push(...itSkillsCriteria);
    }
    if (query.diversity){
        criteria.push(`diversity:equals:${query.diversity}`);
    }
    if (query.age){
        criteria.push(`age:equals:${query.age}`);
    }
    if (query.lastActive){
        criteria.push(`lastActive:equals:${query.lastActive}`);
    }
    const filterCriteria = criteria.join("and");
    return encodeURIComponent(filterCriteria);
}

//this api hit
const getCandidatesData = async (req) => {
    try {
        console.log('AB');
        const searchQuery = req.body;
        const criteria = buildSearchCriteria(searchQuery);
        const url = `${API_URL}?criteria=${criteria}`;
        console.log(url);
        // console.log('Reached here!');
        const candidates = await getCandidatesZoho(url);//function ending with zoho would make API calls
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getCandidateData = async(req, res) => {
    try {
        let id=req.body.id;
        const url=`${API_URL}?criteria=Candidate_ID:contains:${id}`;
        console.log(url);
        url=encodeURIComponent(url);
        const candidates = await candidateService.getCandidateZoho(url);
        return successResponse ({res, data: { candidates }, message: 'Success'})//function ending with zoho would make API calls
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const searchCandidateData = async(req, res) => {
    try {
        const candidates = await candidateService.searchCandidateZoho(req);
        return successResponse ({res, data: { candidates }, message: 'Success'})//function ending with zoho would make API calls
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getFilteredData = async(req, res) => {
    try {
        console.log('Reached Here 2');
        const searchQuery=req.body;
        console.log(searchQuery);
        const criteria=filterSearchcriteria(searchQuery);
        const url = `${API_URL}?criteria=${criteria}`;
        console.log(url);
        const candidates = await candidateService.getFilteredZoho(url);
        return successResponse ({res, data: { candidates }, message: 'Success'})//function ending with zoho would make API calls
    } catch (error) {
        return errorResponse ({res, error})
    }
}

const getSortedCandidateData = async(req, res) => {
    try {
        let data=req.body;
        const url=`${API_URL}?sort_order_by=${data.sortOrder}&sortBy=${data.sortBy}`;
        console.log(url);
        // const candidates = await candidateService.getSortedCandidateZoho(req);
        // return successResponse ({res, data: { candidates }, message: 'Success'})//function ending with zoho would make API calls
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
