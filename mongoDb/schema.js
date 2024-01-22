const {setSharedObj}=require("../shared.js");
const schema=(mongoose)=>{
    const schema=mongoose.Schema({
        Skill:{
            type:String,
            required:true
        },
        Requirements:{
            type:Array,
            required:true
        },
        Roles:{
            type:Array,
            required:true
        },
        Preferred_Skills:{
            type:Array,
            required:true
        },
        Description:{
            type:String,
            required:true
        }
    })
    const SAP=mongoose.model('SAPModel',schema,'SAP');
    const Legacy=mongoose.model('LegacyModel',schema,'Legacy');
    const Cloud=mongoose.model('CloudModel',schema,'Cloud');
    obj={SAP,Legacy,Cloud};
    console.log('abccc',obj);
    setSharedObj(obj);
}
module.exports={schema};