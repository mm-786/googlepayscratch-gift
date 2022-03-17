const express = require('express');
const cors = require('cors');
const { Base, Drive } = require('deta');
const upis = Base('upis')
const app = express();
app.use(express.json());
app.use(cors());

app.get('/upi', async (req,res)=>{
    const data = await upis.fetch();
    res.send(data.items[0])
});

app.post('/upi', async (req,res)=>{
    const { upi,max,min } = req.body;
    const key = "fraud"
    const update_time = new Date();
    const tc = {upi,max,min,key,update_time}
    const data = await upis.put(tc)
    delete data['key'] 
    res.send(data)
});

module.exports = app
