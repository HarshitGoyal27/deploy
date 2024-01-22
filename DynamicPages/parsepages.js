const fs=require('fs');
let txt=fs.readFileSync('./SAP/SAP-Fiori.txt');
txt=''+txt;
txt=txt.trim()
const regex_adv=/Brief Job Advertisement for ([\s\w]+)\s*[\n\r]+([^\n\r]+\s*)(?=Job|$|Roles|Preferred)/i
const regex_pref = /Preferred Skills for ([\s\w]+)\s*[\n\r]+([\s\S]*?)(?=Job|$|Roles|Brief)/i;
const regex_req=/Job Requirements for ([\s\w]+)\s*[\n\r]+([\s\S]*?)(?=Preferred|$|Roles|Brief)/i;
const regex_roles=/Roles and Responsibilities for ([\s\w]+)\s*[\n\r]+([\s\S]*?)(?=Preferred|$|Job|Brief)/i;

const f1=regex_adv.test(txt);
const f2=regex_pref.test(txt);
const f3=regex_req.test(txt);
const f4=regex_roles.test(txt);
console.log(f1,f2,f3,f4);
let obj;
const fun=()=>{
    if(f1 && f2 && f3 && f4){
        obj={};
        obj.Skill=txt.match(regex_req)[1].trim();
        obj.Requirements=txt.match(regex_req)[2].trim().split('\n');
        obj.Roles=txt.match(regex_roles)[2].trim().split('\n');
        obj.Preferred_Skills=txt.match(regex_pref)[2].trim().split('\n');
        obj.Description=txt.match(regex_adv)[2].trim();
        console.log(obj);
        return obj;
    }else{
        console.log('Error');
        return 'Error';
    }
}

module.exports={fun};
fun();