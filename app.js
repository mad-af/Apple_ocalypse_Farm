const { getWallet, sendTransaction } = require("./blockchain");
const express = require("express");
const cors = require("cors");
const path = require("node:path")
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors({origin:"*"}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/wallet',async (req,res)=>{
    const key = req.query["key"];
    if(key === "" || key === undefined)
        return res.status(400).json({message:"query string 'key' is missing"});

    const data = await getWallet(key);

    if (!data)
        return res.status(400).json({message:"key invalide or something went wrong"});

    res.status(200).json(data);
});

app.post('/api/send',async (req,res)=>{
    const key = req.body.key;
    const address = req.body.address;
    const amount = req.body.amount;

    console.log(key,address,amount);

    if(key === undefined || address === undefined || amount === undefined || key === "" || address === "" || amount === "")
        return res.status(400).json({message:"attribute key,address or amount is missing"});
    
    if(parseFloat(amount) <= -1)
        return res.status(400).json({message:"amount can't 0 or negative"});

    const balance = await getBalance(key);

    if(parseFloat(balance) < parseFloat(amount))
        return res.status(409).json({message:"balance unsufficient"});

    const transaction = await sendTransaction(key,address,amount);

    if (!transaction.operation)
        return res.status(400).json({message:"transaction canceled something went wrong"});

    const remainBalance = await getBalance(key);
    transaction.remainBalance = remainBalance;
    res.status(200).json(transaction);
});

app.listen(process.env.PORT,"0.0.0.0",()=>{
    console.log(`listen on port ${process.env.PORT}`)
});