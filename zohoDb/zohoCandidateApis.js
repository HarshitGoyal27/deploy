const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
const axios =require("axios");
let {accessToken,getAccess} =require('./zohoAuthToken'); // Replace with your actual access token
const fs=require('fs');
const newAccessToken=()=>{
  accessToken=getAccess();
  console.log('Token is ',accessToken);
}
let getRequiredFields=(C_data)=>{
  // let total_count=C_data.info.count;
  // console.log(total_count);
  let candidates_array=C_data.data;
  let obj={};
  let arr=[];
  candidates_array.forEach((ele)=>{
      obj={};
      obj.Name=ele.Full_Name;
      obj.Email=ele.Email;
      obj.Skills=ele.Skill_Set;
      obj.id=ele.id;
      obj.Experience=ele.Experience_in_Years;
      obj.PreviousRole=ele.Previous_Role;
      obj.CurrentRole=ele.Current_Role;
      obj.CandidateProfile=ele.Candidate_Profile;
      obj.Salary=ele.Salary;
      obj.PrefferedLocation=ele.Preferred_Location;
      obj.CurrentLocation=ele.Current_Location;
      arr.push(obj);
  })
  return arr;
}
const getCandidatesZoho = async (res,url) => {
  newAccessToken();
  try {
    console.log('ZOHO FN',url);
    const candidates = await axios.get(url, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      },
      params:{
        per_page:5,
        page:1
      }
    });
    if(candidates.data!=''){
      let candidatesData=getRequiredFields(candidates.data);
      console.log(candidatesData);
      return successResponse({ res, data: { candidatesData }, message: "Success" });
    }else{
      return successResponse({res,data:{candidatesData:'Data not present'},message:"Success"});
    }
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const getCandidateZoho = async (res,url1,url2) => {
  newAccessToken();
  try {
    console.log('A');
    const candidates = await axios.get(url1, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`, 
      },
    });
    const tabular=await axios.get(url2,{
      headers:{
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      }
    })
    if(candidates.data!=''){
      let candidatesData=getRequiredFields(candidates.data);
      candidatesData.push(tabular.data.data[0]);
      console.log(candidatesData);
      return successResponse({ res, data: { candidatesData }, message: "Success" });
    }else{
      return successResponse({res,data:{candidatesData:'Data not present'},message:"Success"});
    }
  } catch (error) {
    console.log('HELLOOOOOO',error);
    return errorResponse({ res, error });
  }
};

const searchCandidateZoho=async(url)=>{
  newAccessToken();
  try {
    const candidates = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`, 
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
}

const getFilteredZoho=async(url)=>{
  newAccessToken();
  try {
    const candidates = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`, 
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
}
const getSortedCandidateZoho=async(url)=>{
  newAccessToken();
  try {
    const candidates = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`, 
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
}

let addCandidatesZoho=async(res,data)=>{//completed
  console.log('Reavhed here',data);
  newAccessToken();
  let zohoapi='https://recruit.zoho.in/recruit/v2/Candidates'
    try{
      console.log('ABC');
      await axios.post(`${zohoapi}`,data,{
            headers:{
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
            }
        });
        console.log('ABC');
        return successResponse({ res, data: 'Candidates added Succesfully', message: "Success" });
    }catch(err){
      console.log(err);
      return errorResponse({ res, err });
    }
}

const getCandidatesSearchBarZoho=async(res,url)=>{
  newAccessToken();
  try{
    console.log('C');
    let resp1=await axios.get(url,{
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
          },
        params:{
            per_page:5,
            page:1
        }
    });
    let arr=resp1.data.data;
    let searchSkills=[];
    let currentrole=[];
    if(arr===undefined){
      return successResponse({ res, data: searchSkills, message: "Success" });
    }
    searchSkills=arr.map((ele)=>{
        let skill=ele.Skill_Set.match(/^[^,]*/);
        return skill[0];
    })
    console.log([...searchSkills]);
    const uniqueSkills = [...new Set(searchSkills)];
    return successResponse({ res, data: uniqueSkills, message: "Success" });
  }
  catch(error){
    console.log(error)
    return errorResponse ({res, error})
  }
}

const getLocationSearchBarZoho=async(res,url)=>{
  newAccessToken();
  try{
    console.log('C1234');
    let resp=await axios.get(url,{
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
          },
        params:{
            per_page:5,
            page:1
        }
    });
    let arr=resp.data.data;
    let searchLocation=[];
    console.log('this array',arr);
    if(arr===undefined){
      return successResponse({ res, data: searchLocation, message: "Success" });
    }
    searchLocation=arr.map((ele)=>{
        let location=ele.Current_Location;
        return location;
    })
    const uniqueLocations = [...new Set(searchLocation)];

    return successResponse({ res, data: uniqueLocations, message: "Success" });
  }
  catch(error){
    console.log('Loc',error);
    return errorResponse ({res, error})
  }
}

const updateCandidatesZoho=async(res)=>{

}

const deletedCandidatesZoho=async(res,url)=>{
  newAccessToken();
  try{
    console.log(url);
    let resp=await axios.get(url,{
      headers:{
        'Authorization': `Zoho-oauthtoken ${accessToken}`
      }
    })
    console.log(resp.data);
     return successResponse({ res, data: resp.data, message: "Success" });
  }catch(error){
    //console.log(error)
    return errorResponse ({res, error})
  }
}
module.exports = {
  getCandidatesZoho,getCandidateZoho,searchCandidateZoho,getFilteredZoho,getSortedCandidateZoho,addCandidatesZoho,getCandidatesSearchBarZoho,getLocationSearchBarZoho,
  deletedCandidatesZoho
};
