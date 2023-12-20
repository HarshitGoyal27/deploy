const fs=require("fs");
const axios=require('axios');
let data=fs.readFileSync('./uu.json');
data=JSON.parse(data);
let zohoapi='https://recruit.zoho.in/recruit/v2/Candidates'
const accessToken='1000.9d6a0b23be2c947f67122fe24f2197f0.a6fb604844cb8877084b393ff7677004';
// let addCandidatesZoho=async(data)=>{//completed
//     console.log('Reavhed here');
//       try{
//         console.log('ABC');
//         let resp=await axios.post(`${zohoapi}`,{data},{
//               headers:{
//                   'Authorization': `Zoho-oauthtoken ${accessToken}`,
//               }
//           });
//           return resp;
//           console.log('ABC');
//       }catch(err){
//         console.log(err);
//       }
// }
let get=async()=>{
    const id = '107281000000384003'; // Replace with the module ID for Candidates
    let str='...more'
    try {
        const response = await axios.get(`${zohoapi}/search?criteria=(Skill_Set:contains:more)and(Skill_Set:contains:\+)`,{
            headers:{
                'Authorization':`Zoho-oauthtoken ${accessToken}`
            }
        });
       
        return response.data.data;
    } catch (error) {

        console.error('Error adding tabular records:',error);
    }
}
// let data1=[
//     {
//         "Last_Name": "Arvind",//done
//         "Experience_in_Years": 21,//done
//         "Current_Salary": 60240.96,//done
//         "Current_Location": "Chandigarh",//done
//         "Current_Role": "Senior Manager (Leadership Position) at Deloitte Consulting",//done
//         "Previous_Role": "Associate Partner-Principal Consultant at Wipro",//done
//         "Highest_Qualification": "MBA/PGDM Symbiosis Centre For Management and HRD, Pune 2006 B.Tech/B.E. Panjab University 2000",//done
//         "Preferred_Location": "Chandigarh, Delhi / NCR, Bengaluru",//done
//         "Skill_Set": "S4 HANA Logistics Architect , SAP SD , MM , SAP Utilities Functional Consultant , Certified Project Manager , Certified Scrum Master , AWS Certified Solution Architect , Project Management , Delivery Management , Scrum Master , SAP S4 HANA Certified Sales Architect , SAP S4 HANA MM Certified Architect",//done
//         "Additional_Skills": "Sap Sales And Distribution , Sap Tm , Sap",//done
//         "Candidate_Profile": "SENIOR MANAGER DELOITTE CONSULTING SAP Certified S4 HANA Logistics/Sales Architect, SAP SD/MM, SAP Logistics, SAP TMS, SAP ISU (SAP S4 HANA SALES 2020 CLOUD, S4 HANA SOURCING AND PROCUREMENT 1809 CERTIFIED)PMP CERTIFIED, CERTIFIED SCRUM MASTER)"//done
//     }
// ]
// let arr=[];
// let tabular={
//     "data":[
//         {
//             "Educational_Details": [
//                 {
//                     "id":"107281000000384003",
//                     "Degree": "BSc",
//                     "Institute_School":"ABCDEFGHIJKLMNOPQRSTUVYWXYZ"
//                 }
//             ]
//         }
//     ]
//   }
// let add=(async()=>{
//     try{
//         let resp=await addCandidatesZoho(data);
//         console.log('hello',resp)
//     }
//     catch(err){
//         console.log(err);
//     }

// })();
 let u=get();
// u.then((resolve)=>{
//     let arr=[]
//     let obj={}
//     console.log(resolve)
//     resolve.forEach((ele)=>{
//         obj={}
//         if(ele.Candidate_Profile){
//             console.log('hello');
//             obj.Candidate_Profile=ele.Candidate_Profile;
//         }
//         obj.Additional_Skills=ele.Additional_Skills;
//         obj.Last_Name=ele.Last_Name;
//         obj.id=ele.id;
//         arr.push(obj)
//     })
//     fs.writeFileSync('./uu.json',JSON.stringify(arr));

// })
// let update=(async()=>{
//     console.log('hello')
//     let resp=await axios.put(`${zohoapi}`,{data},{
//         headers:{
//             'Authorization':`Zoho-oauthtoken ${accessToken}`
//         }
//     })
//     console.log(resp.data.data)
// })();
// let obj={};
console.log(data.length)

 