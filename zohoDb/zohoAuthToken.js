const axios=require('axios');
const express=require('express');
const fs=require('fs');
let clientId='1000.ZHP5FPHGX4D7I139DFPS8HF8TWWJ1A';
let clientSecret='7a0cd27669ac157c97d5decfac010b94df84c882bf';
let codes='1000.b9ba7af722d3049db30145df82cbf657.7cf66c4040615ef05dbb7318280a3163';
let redirectUri='https://skillscapital.io/';
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
let getAuthTokenusingReferesh=(async()=>{
    try{
        let resp=await axios.post(`https://accounts.zoho.in/oauth/v2/token?refresh_token=1000.a55efb2fae1c73c500e6a2dff37d627c.5ebc601a57e194109cad546334724043&client_id=1000.ZHP5FPHGX4D7I139DFPS8HF8TWWJ1A&client_secret=7a0cd27669ac157c97d5decfac010b94df84c882bf&grant_type=refresh_token`);
        console.log(resp);
    }catch(err){
        console.log('errrorr',err);
    }
})();
