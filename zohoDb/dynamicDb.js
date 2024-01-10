require("dotenv").config();
const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
const axios = require("axios");


const getSAPDb=async(res)=>{
    try{
        const successResponse=await axios.post(url,{data},{
            headers:{
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            }
        })
        template();
        return successResponse({ res, data: "Clients added Succesfully", message: "Success" });
    }catch(err){
        return errorResponse({res,err});
    }
}

const getCloudDb=async(res)=>{
    try{
        const successResponse=await axios.put(url,{data},{
            headers:{
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            }
        })
        template();
        return successResponse({ res, data: "Clients Candidates added Succesfully", message: "Success" });
    }catch(err){
        return errorResponse({res,err})
    }
}

const getLegacyDb=async(res)=>{
    try{
        const successResponse=await axios.put(url,{data},{
            headers:{
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            }
        })
        template();
        return successResponse({ res, data: "Clients Candidates added Succesfully", message: "Success" });
    }catch(err){
        return errorResponse({res,err})
    }
}

let template=()=>{

}


module.exports={getSAPDb,getCloudDb,getLegacyDb};