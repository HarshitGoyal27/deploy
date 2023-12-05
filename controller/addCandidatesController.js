const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
const {addCandidatesData} = require('../services/addCandidatesService');
const axios=require('axios');
//input data should be json array
// const r={
    // "data": [
    //     {
    //         "Company": "Zylker",
    //         "Last_Name": "Daly",
    //         "First_Name": "Paul",
    //         "Email": "p.daly@zylker.com",
    //         "State": "Texas"
    //     },
    //     {
    //         "Company": "Villa Margarita",
    //         "Last_Name": "Dolan",
    //         "First_Name": "Brian",
    //         "Email": "brian@villa.com",
    //         "State": "Texas"
    //     }
    // ]
// }
const addCandidates=async(req,res)=>{
    console.log('Reeaachhed1');
    try{
        let successResponse=await addCandidatesData(req,res);
        return successResponse;
    }
    catch(err){
        return errorResponse ({res, err})
    }
}

module.exports={addCandidates}