const mongoose=require('mongoose');
const uri = "mongodb+srv://romanmania619:t3NGtHxKNBTLn38c@cluster0.l5mueji.mongodb.net/?retryWrites=true&w=majority";
const axios=require('axios');
mongoose.connect(uri).then(()=>{
  console.log('DB connected');
  fun();
}).catch(()=>{
  console.log('Not connected');
})

const schema=mongoose.Schema({
  name:{
    type:String,
  },
  password:{
    type:String
  }
})

const xyz=mongoose.model('ABCDEFG',schema);

let user={name:'Harshit',password:'1234'}
let fun=()=>{
  xyz.create(user).then(()=>{
    console.log('Added');
  })
}

