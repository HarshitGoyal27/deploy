const mongoose=require('mongoose');
const uri = "mongodb+srv://romanmania619:t3NGtHxKNBTLn38c@cluster0.l5mueji.mongodb.net/Skills-Capital?retryWrites=true&w=majority";
const axios=require('axios');
const fs=require('fs');
const {setSharedObj} = require('../shared.js');
const {schema}=require("./schema.js");
const connection=()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            await mongoose.connect(uri);
            schema(mongoose);
            resolve('Mongodb connected');
        }catch(err){
            reject('Mongodb Not connected');
        }
    })
}

module.exports={connection};



