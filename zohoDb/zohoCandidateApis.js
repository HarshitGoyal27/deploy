const {
  successResponse,
  errorResponse,
} = require("../utils/response/response.handler");
const axios =require("axios");
const accessToken = '1000.9eee223bc7c11cd781cfd94cf60a5d23.1ab97b4f6c4bfdd8f89855feec2b99fc'; // Replace with your actual access token
const criteria = '((Experienece_In_Years:equals:2)or(Skill_Set:contains:SAP))and(Skill_Set:contains:kotlin)';//this answer should be 0
//hitting this method:
//Stack
//no need for base case just put () to the whole criteria string
const fun=async(criteria,url)=>{
  const queryRegex = /\(Skill_set:(equals|contains):[a-zA-Z0-9\s]+\)/g;
  const opregex=/\d(and|or)\d/g//direct api call for 1 level of brackets
  const queries = criteria.match(queryRegex) || [];
  if(queries.length===1){
    return -1;
  }
  for(let i=0;i<queries.length;i++){
      criteria=criteria.replace(`${queries[i]}`,`${i}`);
  }
  console.log(criteria);
  let stack1=[];
  let stack2=[];
  for(let i=0;i<criteria.length;i++){
    let ch=criteria.charAt(i);
    if(ch==')'){
      let str=''
      while(stack1[stack1.length-1]!='('){
         str+=stack1.pop();
      }
      stack1.pop();
      let newString='';
      for (var j = str.length - 1; j >= 0; j--) { 
        newString += str.charAt(j); 
      }
      console.log(newString);
      if(opregex.test(newString)){
        //direct API call put ans to new stack
        console.log('reached');
        newString = newString.replace(/\d/g, match => {
          const index = parseInt(match); // Convert the digit to an array index
          return queries[index] || match; // Replace with the corresponding query or keep the digit
        });
        console.log(newString);
        let candidates_data_withop=await APIcall(newString,url);
        stack2.push(candidates_data_withop);
      }else{
        let operator='';
        if(newString.length()===2){
            operator='or';
        }else{operator='and';}
        let idx=newString.search(/\d/g);
        newString=queries[newString.charAt(idx)];
        console.log(newString);
        let candidates_data_withoutop=await APIcall(newString,url);
        PerformOperation(newString,operator,stack2,candidates_data_withoutop);
      }
    }else{
      stack1.push(ch);
    }
  }
}
let PerformOperation=(condition,op,stack2,data1)=>{
  console.log('**',condition);
  let val=condition.split(':');
  let first=val[0].substring(1);
  let second=val[1];
  let third=val[2];
  let data2=stack2.pop();
  let data3=[];
  let i=0,j=0;
  const set=new Set();
  set.add(data1);
  set.add(data2);
  if(op==='or'){
    data3=[...set];
    return data3;
  }else{
     set.forEach((value)=>{
        if(value.first===third){
          data3.push(value);
        }
     })
     return data3;
  }
  
}

const APIcall=async(newString,url)=>{
  try {
    const candidates = await axios.get(url, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      }
    });
    console.log('AAAAAA');
    console.log(candidates.data);
    return candidates.data;
    
  } catch (error) {
    console.log(error);
    
  }
}
const getCandidatesZoho = async (url) => {
  try {
    console.log('ZOHO FN',url);//till here okay
    const urL = `https://recruit.zoho.in/recruit/v2/Candidates/search?criteria=${encodeURIComponent(criteria)}`;
    const candidates = await axios.get(urL, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      }
    });
    console.log('AAAAAA');
    console.log(candidates.data);
    
  } catch (error) {
    console.log(error);
    return errorResponse({ res, error });
  }
};
//////:
const getCandidateZoho = async (url) => {
  try {
    const candidates = await axios(url, {
      headers: {
        Authorization: "Zoho-oauthtoken YOUR_ZOHO_AUTH_TOKEN", 
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
        Authorization: "Zoho-oauthtoken YOUR_ZOHO_AUTH_TOKEN", 
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
        Authorization: "Zoho-oauthtoken YOUR_ZOHO_AUTH_TOKEN", 
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
        Authorization: "Zoho-oauthtoken YOUR_ZOHO_AUTH_TOKEN", 
      },
    });
    return successResponse({ res, data: { candidates }, message: "Success" });
  } catch (error) {
    return errorResponse({ res, error });
  }
}

module.exports = {
    getCandidatesZoho,getCandidateZoho,searchCandidateZoho,getFilteredZoho,getSortedCandidateZoho
};
//route->controller->service->zoho API