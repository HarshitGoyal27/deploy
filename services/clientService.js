const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler');
const {API_CLIENT}=require('../utils/constants/constants.js');
const {addClientsZoho,addClientCandidatesZoho}=require('../zohoDb/zohoClientApi');
const addClientsData=async(req,res)=>{
    try{
        const data=req.body;
        const successResponse=await addClientsZoho(res,data,API_CLIENT);
        return successResponse;
    }catch(err){
        return errorResponse({res,err});
    }
}

const addClientCandidatesData=async(req,res)=>{
    try{
        const clientId=req.body.clientId
        const candidateId=req.body.candidateId;
        const successResponse=await addClientCandidatesZoho(res,clientId,candidateId,url);
        return successResponse;
    }catch(err){
        return errorResponse({res,err});
    }
}
module.exports={addClientsData,addClientCandidatesData}