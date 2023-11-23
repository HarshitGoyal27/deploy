const axios=require('axios');
const express=require('express');
const fs=require('fs');
const requestData={
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code:codes
};
const requestData2={
    client_id: clientId,
    response_type :'code',
    redirect_uri: redirectUri,
};

console.log('A');
// one time use
// let getAuthToken=async()=>{
//     try{
//         let resp=await axios.post('https://accounts.zoho.in/oauth/v2/token',null,{
//             params:requestData
//         });
//         console.log(resp);
//     }catch(err){
//         console.log('Errrooorrrr',err);
//     }
// }

