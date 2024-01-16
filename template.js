let fs=require('fs');
let fun=async()=>{
    console.log('A123');
    await fs.promises.readFile('./u.json');
    console.log('B');
    return "OK"
}
let cnt=0;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// [1,2,3,4,5].forEach(async (ele)=>{
//         fun()
//         console.log('C')
    
// })
let arr=[]
let res=async()=>{
    arr=[]
    while(cnt!=5){
        cnt++;
        await delay(0);
        console.log('D');
        let pro=fun();
        arr.push(pro);
        console.log('C',pro);
    }
    return arr;
}
let resp=res();
resp.then((resolve)=>{
    Promise.all(arr).then((res)=>{
        console.log(res);
    })
})
//forEach works differently
