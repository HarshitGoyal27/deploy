const fs=require("fs");
const axios=require('axios');
let data=fs.readFileSync('./test11Add.json');
data=JSON.parse(data);
const accessToken='1000.58f02758124389a259206b616c3b15bc.df46e83eb38f5c0c7fda83e359df56a1';
let addCandidatesZoho=async(data)=>{//completed
    console.log('Reavhed here');
    let zohoapi='https://recruit.zoho.in/recruit/v2/Candidates'
      try{
        console.log('ABC');
        await axios.post(`${zohoapi}`,{data},{
              headers:{
                  'Authorization': `Zoho-oauthtoken ${accessToken}`,
              }
          });
          console.log('ABC');
      }catch(err){
        console.log(err);
      }
}
let data1=[
    {
        "Last_Name": "ABCDEFGH",
        "Experience_in_Years": 5,
        "Salary": "₹ 17.50 Lacs",
        "Current_Location": "Pune",
        "Current_Role": "Senior Business Analyst",
        "Previous_Role": "SAP PP QM Consultant",
        "Preferred_Location": "Pune",
        "Candidate_Profile": "candidate profile SAP PP Certified Consultant with more than 5.5 Years of experience, in implementation, support and interface of SAP PP/QM View phone number Call candidate Verified phone & email Comment | Save 432 65 CV",
        "Skill_Set": "SAP PP Certified Consultant , SAP Production Planning , SAP PP Module , SAP Support Executive , Shop Floor Control , Bom Preparation , SAP Implementation , SAP QM , SAP Quality Management , SAP S4 HANA , S4 HANA Implementation , SAP HANA , SAP PP QM Consultant , SAP PP , MS Excel",
    }
]
let arr=[];
data1.forEach(async(ele)=>{
    arr.push(ele);
    if(arr.length===5){
        await addCandidatesZoho(arr);
        arr=[];
    }
})
console.log(data.length)