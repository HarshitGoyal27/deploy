//TO add data
let fs=require('fs');
let axios=require('axios');
let test3=fs.readFileSync('./test11.json');
test3=JSON.parse(test3);
let arr=[];
function ExperienceInYears(years,months){
    let decimalYears = years + months / 12;
    decimalYears=Math.round(decimalYears * 100) / 100;
    return Math.floor(decimalYears);
}
test3.forEach((ele)=>{
    let obj={};
    let experience=ele.experience;
    let Expregex=/[\d]+/g
    let matches = experience.match(Expregex);
    let years = parseInt(matches[0]);
    let months = parseInt(matches[1]);
    obj.Last_Name=ele.name.trim();
    obj.Experience_in_Years=ExperienceInYears(years,months);
    obj.Salary=ele.salary;
    obj.Current_Location=ele.location;
    obj.Current_Role=ele.currentRole;
    obj.Previous_Role=ele.previousRole;
    obj.Preferred_Location=ele.preferredLocation;
    obj.Candidate_Profile=ele.candidateProfile;
    obj.Skill_Set=ele.skills.replace(/\|/g,',').trim();
    arr.push(obj);
})
// test3.forEach((ele)=>{
//     let val=ele.Experience_In_Years;
//     ele.Experience_In_Years=Math.floor(val);
//     arr.push(ele);
// })
fs.writeFileSync('./test11Add.json',JSON.stringify(arr));