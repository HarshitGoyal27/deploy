const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler')
//const candidateService = require('../services/addCandidateService');
const axios=require('axios');
let zohoapi='https://recruit.zoho.in/recruit/v2/Candidates';
const r={
    "data": [
        {
            "Company": "Zylker",
            "Last_Name": "Daly",
            "First_Name": "Paul",
            "Email": "p.daly@zylker.com",
            "State": "Texas"
        },
        {
            "Company": "Villa Margarita",
            "Last_Name": "Dolan",
            "First_Name": "Brian",
            "Email": "brian@villa.com",
            "State": "Texas"
        }
    ]
}
const addCandidates=async(req,res)=>{
    console.log('Reeaachhed');
    try{
        await axios.post(`${zohoapi}`,r,{
            headers:{
                'Authorization': `Zoho-oauthtoken 1000.bdcce26399d165c0c80f98a85b1b3e33.277a79705edf2784cff22f7cda9c515d`,
            }
        })
    }catch(err){
        console.log(err.data);
    }
}

module.exports={addCandidates}