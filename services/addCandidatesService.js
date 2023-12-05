const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
const { getCandidatesZoho,getCandidateZoho,searchCandidateZoho,getFilteredZoho,getSortedCandidateZoho,addCandidatesZoho } =require('../zohoDb/zohoCandidateApis');

const addCandidatesData = async (req,res) => {
    try {
        const dataFromrequest = req.body;//JSON array[{},{},{},...]
        console.log('Reached here!2');
        const dataTobeAdded={};
        //Basic Info
        dataTobeAdded.First_Name=dataFromrequest.FirstName;
        if(dataFromrequest.MiddleName){dataTobeAdded.Middle_Name=dataFromrequest.MiddleName;}
        dataTobeAdded.Last_Name=dataFromrequest.LastName;
        dataTobeAdded.Email=dataFromrequest.Email;
        const successResponse = await addCandidatesZoho(res,dataFromrequest);//function ending with zoho would make API calls
        return successResponse
    } catch (error) {
        return errorResponse ({res, error})
    }
}
module.exports={addCandidatesData}