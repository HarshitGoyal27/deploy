require("dotenv").config();
const axios=require('axios');
const express=require('express');
const fs=require('fs');
const clientId = '1000.ZYBGSTAYX4E681I2JIUPK1ZPZS8D7J';
const clientSecret = '3360eee570c1054ccbd8da73a4979ffce8ee1377af';
const refreshtoken = '1000.50c452dd1039d358398b44cbd90836ac.a72ad80cde73e1e390c5c3910b9a5c31';
// const requestData={
//     grant_type: 'authorization_code',
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: redirectUri,
//     code:codes
// };
// console.log('A');
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
        console.log(resp);
    }catch(err){
        console.log('errrorr',err);
    }
}
getAuthTokenusingReferesh()