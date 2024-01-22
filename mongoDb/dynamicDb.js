require("dotenv").config();
const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
const axios = require("axios");
const {getSharedObj} = require('../shared.js');
const {skill}=require("../chatgpt.js");
const getDeveloperDb=async(res,search_word)=>{
    try{
        const {SAP,Legacy,Cloud}=getSharedObj();
        let resp=await SAP.findOne({Skill:new RegExp(`${search_word}`,'i')});
        if(resp){
            return successResponse({ res, data:resp, message: "Success" });
        }
        else{
            const search_skill=search_word+'Developer';
            await skill(search_word);
            console.log('Completed');
        }

    }catch(err){
        return errorResponse({res,err});
    }
}


module.exports={getDeveloperDb};
