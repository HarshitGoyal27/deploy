const { 
    successResponse,
    errorResponse,
} = require('../utils/response/response.handler');
const {API_CLIENT}=require('../utils/constants/constants.js');
const {getSAPDb,getCloudDb,getLegacyDb}=require('../zohoDb/dynamicDb.js');

const getSAPdata=async(req,res)=>{
    try{
        const successResponse=await getSAPDb(res);
        return successResponse;
    }catch(err){
        return errorResponse({res,err});
    }
}

const getLegacyData=async(req,res)=>{
    try{
        const successResponse=await getLegacyDb(res);
        return successResponse;
    }catch(err){
        return errorResponse({res,err});
    }
}

const getCloudData=async(req,res)=>{
    try{
        const successResponse=await getCloudDb(res);
        return successResponse;
    }catch(err){
        return errorResponse({res,err});
    }
}

module.exports={getSAPdata,getCloudData,getLegacyData}