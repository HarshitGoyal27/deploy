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
        const obj={};
        obj.Client_Name=req.body.Name;
        obj.Email=req.body.Email;
        obj.Company=req.body.Company;
        obj.Contact_Number=req.body.Contact
        obj.Call_Schedule=req.body.CallSchedule;
        obj.Candidates=req.body.Candidates.join(',');
        console.log('B Reached',obj,API_CLIENT)
        const successResponse=await addClientCandidatesZoho(res,[obj],API_CLIENT);
        return successResponse;
    }catch(err){
        return errorResponse({res,err});
    }
}
module.exports={addClientsData,addClientCandidatesData}