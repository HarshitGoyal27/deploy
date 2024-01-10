const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler');
const dynamicService=require('../services/dynamicService')

const getSAP=async(req,res)=>{
    try{
        const successResponse=await dynamicService.getSAPdata(req,res);
        return successResponse;
    }catch(error){
        return errorResponse({res,error});
    }
}

const getCloud=async(req,res)=>{
    try{
        const successResponse=await dynamicService.getCloudData(req,res);
        return successResponse;
    }
    catch(error){
        return errorResponse({res,error});
    }
}

const getLegacy=async(req,res)=>{
    try{
        const successResponse=await dynamicService.getLegacyData(req,res);
        return successResponse;
    }catch(error){
        return errorResponse({res,error});
    }
}
module.exports={getSAP,getCloud,getLegacy};