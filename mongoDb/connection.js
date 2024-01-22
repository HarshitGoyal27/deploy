const mongoose=require('mongoose');
const uri = "mongodb+srv://romanmania619:t3NGtHxKNBTLn38c@cluster0.l5mueji.mongodb.net/Skills-Capital?retryWrites=true&w=majority";
const axios=require('axios');
const fs=require('fs');
const {setSharedObj} = require('../shared.js');
const {schema}=require("./schema.js");
const connection=async()=>{
    mongoose.connect(uri).then(()=>{
        console.log('DB connected');
        schema(mongoose);
    }).catch((err)=>{
        console.log('Not connected',err);
    });
}

module.exports={connection};



