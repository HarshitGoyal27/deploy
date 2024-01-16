// const mongoose=require('mongoose');
// const uri = "mongodb+srv://romanmania619:t3NGtHxKNBTLn38c@cluster0.l5mueji.mongodb.net/?retryWrites=true&w=majority";
const axios=require('axios');
// mongoose.connect(uri).then(()=>{
//   console.log('DB connected');
// }).catch(()=>{
//   console.log('Not connected');
// })

// const SkillsAPI = require("emsi-skills-api");
// const axios=require('axios');

let Client_ID= 'mxvbshckcxa9ayq5'
let Secret= 'ngcudBFh'
let Scope= 'emsi_open'

// const schema=mongoose.Schema({
//   name:{
//     type:String,
//   }
// })

// const userModel=mongoose.model('userModel',schema);

// let user={name:'Harshit'}
// userModel.create(user).then(()=>{
//   console.log('Added');
// })

// const request = require('request');

const options = {
  method: 'POST',
  url: 'https://auth.emsicloud.com/connect/token',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  form: {
    client_id: 'mxvbshckcxa9ayq5',
    client_secret: 'ngcudBFh',
    grant_type: 'client_credentials',
    scope: 'emsi_open'
  }
};

let getAccessToken=async()=>{
    try{
        let resp=await axios.post('https://auth.emsicloud.com/connect/token',{
          client_id: 'mxvbshckcxa9ayq5',
          client_secret: 'ngcudBFh',
          grant_type: 'client_credentials',
          scope: 'emsi_open'
        }
        ,{
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        console.log(resp.data);
    }catch(err){
      console.log(err);
    }
}
//getAccessToken();

let token={"access_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjNDNjZCRjIzMjBGNkY4RDQ2QzJERDhCMjI0MEVGMTFENTZEQkY3MUYiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJQR2FfSXlEMi1OUnNMZGl5SkE3eEhWYmI5eDgifQ.eyJuYmYiOjE3MDUzOTM0MTcsImV4cCI6MTcwNTM5NzAxNywiaXNzIjoiaHR0cHM6Ly9hdXRoLmVtc2ljbG91ZC5jb20iLCJhdWQiOlsiZW1zaV9vcGVuIiwiaHR0cHM6Ly9hdXRoLmVtc2ljbG91ZC5jb20vcmVzb3VyY2VzIl0sImNsaWVudF9pZCI6Im14dmJzaGNrY3hhOWF5cTUiLCJlbWFpbCI6InJvbWFubWFuaWE2MTlAZ21haWwuY29tIiwiY29tcGFueSI6IlhZWiIsIm5hbWUiOiJIYXJzaGl0IEdveWFsIiwiaWF0IjoxNzA1MzkzNDE3LCJzY29wZSI6WyJlbXNpX29wZW4iXX0.BpYzhOoFpQOwt12XamihvNqIDOBtHrvM2QBKAtXMaWWqrRoLBSJyG_vXWwTH2rXRYBdWw8QpE-Ri9VVwyMFea6qcdG--Wbh3Bx-QYEGps94Su7JjRXxuyy5AC4ruY5mwlwYKsERSq2tiRhJnB-dBTd-ou6pDUt5SVNKJLkPpwBCosaZ9X2OqTSfueE-K2AnfXfrbCaPiCER-Q_XwyhFeKOUPJTmvUJGUehlDlDeT8RYkGoESLaRz3gQxPL179IR0iHKF6CdInyOiAHB6lqfg-KFwJpHvuU7Pa-YOhrxynYcgh_ue0TaGUQaI2gXTAGgd-cjTrrpOY0X6dv1NMbiCoA","expires_in":3600,"token_type":"Bearer","scope":"emsi_open"}

let getSkills=(async()=>{
    try{
      const resp=await axios.post('https://emsiservices.com/skills/versions/latest/skills',{
        qs:'.NET'
      },{
        headers:{
          Authorization:`Bearer ${token.access_token}`
        }
      });
      console.log(resp)
    }catch(Err){
      console.log(Err);
    }
})();

