const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const router=require('./routes/candidates');
let {getAuthTokenusingReferesh}=require('./zohoDb/zohoAuthToken');
app.use(cors());
app.use('/api/',router);
app.get('/',(req,resp)=>{
    resp.send('Hi!Skills Capital');
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
getAuthTokenusingReferesh();
setInterval(getAuthTokenusingReferesh,60000*60);

