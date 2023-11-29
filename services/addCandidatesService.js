const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
const { getCandidatesZoho,getCandidateZoho,searchCandidateZoho,getFilteredZoho,getSortedCandidateZoho } =require('../zohoDb/zohoCandidateApis');
const addCandidatesData = async (req) => {
    try {
        const searchQuery = req.body;
        const criteria = buildSearchCriteria(searchQuery);
        const url = `${API_URL}?criteria=${criteria}`;
        console.log(url);
        console.log('Reached here!');
        const candidates = await addCandidatesZoho(url);//function ending with zoho would make API calls
        return successResponse ({res, data: { candidates }, message: 'Success'})
    } catch (error) {
        return errorResponse ({res, error})
    }
}
module.exports={addCandidatesData}