const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
const axios =require("axios");
const accessToken = '1000.6dcd4e214b276e9b314f4b354a1eae81.093b90c7ea265fa14ebc20e5b435c949'; // Replace with your actual access token
const fs=require('fs');
const criteria='(Current_Location:contains:noida)and(Salary:contains:37)and(Last_Name:contains:PANDEY)';//296 info:{per_page:200,page:1,more_records:true}
//hitting this method:
//Stack
//no need for base case just put () to the whole criteria string

// let functionToSortBrackets=async(criteria,url)=>{
//   // const queryRegex = /\((Skill_Set|Current_Salary):(equals|contains):([a-zA-Z0-9\s]+)\)/g;
//   // //const opregex=/\d(and|or)\d/g//direct api call for 1 level of brackets
//   // const queries = criteria.match(queryRegex) || [];
//   // console.log(queries);
//   // let stack=[];
//   // queries.forEach(async(ele)=>{
//   //     console.log(ele);
//   //     let apilink=`https://recruit.zoho.in/recruit/v2/Candidates/search?criteria=${encodeURIComponent(ele)}`;
//   //     try{
//   //       let response=await APIcall(apilink);//response is object response={data:[{},{},{},.....]}
//   //       if(stack.length===0){stack.push(response);}
//   //       else{
//   //         let dataTocompareWith=stack.pop();//and
//   //         let exec=queryRegex.exec(ele);
//   //         console.log('exec:::',exec[1],exec[2],exec[3]);
//   //         //compare now
//   //         let arr=[...response.data];
//   //         d
//   //       }
//   //     }catch(err){
//   //       console.log(err);
//   //     }
//   // })
//   APIcall(url);
// }

// let APIcall=async(url)=>{
//   try {
//     const candidates = await axios.get(url, {
//       headers: {
//         'Authorization': `Zoho-oauthtoken ${accessToken}`,
//       },
//       params:{
//         per_page:200
//       }
//     });
  
//     console.log('AAAAAAAA12345567890',candidates.data);///candidates.data.data
//     return candidates.data;
//   } catch (error) {
//     console.log(error);
//     return 'error';
//   }
// }
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
      obj.Experience=ele.Total_Experience;
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
const getCandidatesZoho = async (res,url) => {//completed//FORM
  try {
    console.log('ZOHO FN',url);//till here okay

    //functionToSortBrackets(query,url)
    //const urL = `https://recruit.zoho.in/recruit/v2/Candidates/search?criteria=${encodeURIComponent(query)}`;
    //const url='https://recruit.zoho.in/recruit/v2/Candidates';//GET RECORDS
    //const urL1=`https://recruit.zoho.in/recruit/v2/Candidates/actions/count?criteria=${encodeURIComponent(criteria)}`
    const candidates = await axios.get(url, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      },
      params:{
        per_page:5,
        page:1
      }
    });
    console.log('AAAAAA');
    console.log(candidates.data);
    if(candidates.data!=''){
      let candidatesData=getRequiredFields(candidates.data);
      console.log(candidatesData);
      return successResponse({ res, data: { candidatesData }, message: "Success" });
    }else{
      throw new Error('Data not present');
    }
  } catch (error) {
    console.log(error);
    return errorResponse({ res, error });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getCandidateZoho = async (url) => {
  try {
    const candidates = await axios(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`, 
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

const searchCandidateZoho=async(url)=>{
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

const getCandidatesSearchBarZoho=async(res,search)=>{
  try{
    console.log('C');
    let searcH1=`(Skill_Set:starts_with:${search})`;
    let resp1=await axios.get(`https://recruit.zoho.in/recruit/v2/Candidates/search?criteria=${encodeURIComponent(searcH1)}`,{
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
          },
        params:{
            per_page:5,
            page:1
        }
    });
    // let searcH2=`(Current_Role:starts_with:${search})`;
    // let resp2=await axios.get(`https://recruit.zoho.in/recruit/v2/Candidates/search?criteria=${encodeURIComponent(searcH2)}`,{
    //     headers: {
    //         'Authorization': `Zoho-oauthtoken ${accessToken}`,
    //       },
    //     params:{
    //         per_page:5,
    //         page:1
    //     }
    // });
    console.log(resp1.data,'hello');
   // console.log(resp2.data,'helloabcdefg');
    let arr=resp1.data.data;
    let searchSkills=[];
    //let arr2=resp2.data.data;
    let currentrole=[];
    if(arr===undefined){
      return successResponse({ res, data: searchSkills, message: "Success" });
    }
    // if(arr2===undefined){
    //   return successResponse({ res, data: currentrole, message: "Success" });
    // }
    searchSkills=arr.map((ele)=>{
        let skill=ele.Skill_Set.match(/^[^,]*/);
        return skill[0];
    })
    // currentrole=arr2.map((ele)=>{
    //     return ele.Current_Role;
    // })
    console.log([...searchSkills]);
    const uniqueSkills = [...new Set(searchSkills)];
    return successResponse({ res, data: uniqueSkills, message: "Success" });
  }
  catch(error){
    console.log(error)
    return errorResponse ({res, error})
  }
}

const getLocationSearchBarZoho=async(res,search)=>{
  try{
    console.log('C1234',search);
    let searcH=`(Current_Location:starts_with:${search})`;
    console.log(searcH);
    let resp=await axios.get(`https://recruit.zoho.in/recruit/v2/Candidates/search?criteria=${encodeURIComponent(searcH)}`,{
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
          },
        params:{
            per_page:5,
            page:1
        }
    });
    console.log(resp.data,'hello');
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
    console.log('Loc',err);
    return errorResponse ({res, error})
  }
}

const updateCandidatesZoho=async(res)=>{

}

const deletedCandidatesZoho=async(res,url)=>{
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
//route->controller->service->zoho API