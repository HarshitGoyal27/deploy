const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
const { getCandidatesZoho,getCandidateZoho,searchCandidateZoho,getFilteredZoho,getSortedCandidateZoho,getCandidatesSearchBarZoho,getLocationSearchBarZoho,deletedCandidatesZoho}
=require('../zohoDb/zohoCandidateApis');
const { API_URL , API_DELETED_COUNT} =require ('../utils/constants/constants');
const axios=require('axios');
const { updateCandidates, deletedCandidates } = require('../controller/candidateController');
//we have to send search criteria from this file
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
const getCandidatesData = async (req,res) => {
    try {
        // console.log('AB');
        // const searchQuery = req.body;
        // const criteria = buildSearchCriteria(searchQuery);
        // const url = `${API_URL}?criteria=${criteria}`;//we have to make url
        // console.log(url);
        // const criteria = 'Skill_set:contains:blockchain';
        // const accessToken = '1000.efcad6eeab0b575a5f8246800c05fadb.a3b5c5d1e798f746738ddd2934d748eb';
        // console.log('Reached here!');
        console.log('B');
        let query=req.body.profiles;//we have to make query here and process it in zohoCandidateAPI
        //let query=req.body.data;
        let str='';//{[...]}
        for(let key in query){
            console.log(key);
            if(query[key]!='' && key.charAt(0)!='E'){
                str+=`(${key.trim()}:contains:${query[key].trim()})and`
                //console.log(str);
            }else if(key.charAt(0)==='E' && query[key]!=''){
                str+=`(${key.trim()}:equals:${query[key].trim()})`
            }
        }
        query=str;
        //query+=`(Experience_in_Years:equals:${query.Experience})`;
        //query='(Skill_Set:contains:SAP BI)and(Salary:contains:30 Lacs';
        console.log(query);
        let url=`${API_URL}?criteria=${encodeURIComponent(query)}`;
        const successResponse = await getCandidatesZoho(res,url);//function ending with zoho would make API calls
        return successResponse;
    } catch (error) {
        console.log('xyzabc');
        return errorResponse ({res, error})
    }
}

const getCandidateData = async(req, res) => {
    try {
        let id=req.params.id;
        console.log(id);
        const url=`https://recruit.zoho.in/recruit/v2/Candidates/${id}`;
        console.log(url);
        const successResponse = await getCandidateZoho(res,url);
        return successResponse;//function ending with zoho would make API calls
    } catch (error) {
        console.log(error);
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
        const url = `${API_URL}?criteria=(${criteria})`;
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

const getcandidateSearchBarData= async(req,res)=>{
    try{
        let data=req.body;
        console.log(data,'B');
        //let search=`(Current_Role:starts_with:${data.search})or(Skill_Set:starts_with:${data.search})`;
        let successResponse=await getCandidatesSearchBarZoho(res,data.search);
        return successResponse;
    }
    catch(error){
        return errorResponse ({res, error})
    }
}

const getLocationSearchBarData= async(req,res)=>{
    try{
        let data=req.body;
        console.log(data,'B','Reached');
        //let search=`(Current_Role:starts_with:${data.search})or(Skill_Set:starts_with:${data.search})`
        let successResponse=await getLocationSearchBarZoho(res,data.searchLocation);
        return successResponse;
    }
    catch(error){
        console.log('abcdefg',error)
        return errorResponse ({res, error})
    }
}

const updateCandidatesData=async(req,res)=>{
    try{
        const successResponse = await updateCandidatesZoho(res);//function ending with zoho would make API calls
        return successResponse;
    }catch(error){
        return errorResponse ({res, error})
    }
}

const deletedCandidatesData=async(req,res)=>{
    try{
        const successResponse = await deletedCandidatesZoho(res,API_DELETED_COUNT);//function ending with zoho would make API calls
        return successResponse;
    }catch(error){
        return errorResponse ({res, error})
    }
}
module.exports = {
    getCandidateData,
    getCandidatesData,
    searchCandidateData,
    getFilteredData,
    getSortedCandidateData,
    getcandidateSearchBarData,
    getLocationSearchBarData,
    updateCandidatesData,
    deletedCandidatesData
}
