require("dotenv").config();
const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
const axios = require("axios");
const {getSharedObj} = require('../shared.js');
const {skill}=require("../chatgpt.js");
const {parsePage}=require("../DynamicPages/parsepages.js")
const getDeveloperDb=async(res,search_word)=>{
    let flag=true;
    let dataToMongoDb=null;
    const {SAP,Legacy,Cloud}=getSharedObj();
    try{
        const resp=await SAP.findOne({Skill:new RegExp(`^${search_word}$`,'i')});
        if(resp){
            return successResponse({res, data:resp, message: "Success" });
        }
        else{
            const resp2=await skill(search_word+' Developer'); 
            flag=false;
            dataToMongoDb=parsePage(`${search_word.replace(/\s+/g,'-').trim()+'.txt'}`);
            if(dataToMongoDb)
                return successResponse({res, data:dataToMongoDb, message: "Success" });
            else
                throw new Error('Errorrr in parse pagee');
        }
    }catch(err){
        console.log(err);
        return errorResponse({res,err});
    }finally{
        if(!flag && dataToMongoDb){
            try{
                dataToMongoDb.Skill=dataToMongoDb.Skill.replace(/\s+Developer/i,'').trim();
                const user=await SAP.create(dataToMongoDb);
                console.log('Data added to Mongodb',user);
            }catch(err){
                console.log('Could not add data to mongodb',err);
            }
        }
    }
}


module.exports={getDeveloperDb};
