const axios=require('axios');
const express=require('express');
const fs=require('fs');
const clientId='1000.DNYK7GIFFIWJKM992S9NR2X3B497FZ';
const clientSecret='b3175156f597aa63d1901fe2e200ddba151a40a3ec';
const codes='1000.fd01c8db6d6dd229a899933a7f9feb36.6ee4dd840fa1a709b65748af39255b13';
const redirectUri='https://skillscapital.io/';
const refreshtoken='1000.0b7ddec1149a0fd76dda4677a6c5031a.9487a874e5ca3b95e6714b487a8e8161';
let accessToken='';
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
// let getAuthToken=(async()=>{
//     try{
//         let resp=await axios.post('https://accounts.zoho.in/oauth/v2/token',null,{
//             params:requestData
//         });
//         console.log(resp);
//     }catch(err){
//         console.log('Errrooorrrr',err);
//     }
// })();
let getAuthTokenusingReferesh=async()=>{
    try{
        let resp=await axios.post(`https://accounts.zoho.in/oauth/v2/token?refresh_token=${refreshtoken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`);
        console.log('zohoauthtoken file',resp.data.access_token);
        accessToken=resp.data.access_token;
    }catch(err){
        console.log('errrorr',err);
    }
}

let getAccess=()=>{
    return accessToken;
}

module.exports={accessToken,getAccess,getAuthTokenusingReferesh};

//1000.4c8f1b8598333689d528094d1c8e49ee.f70e472af2fa94177dea1d1d020438a6

