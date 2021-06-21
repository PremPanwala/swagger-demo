const express=require('express')
const app=express();
const port = process.env.PORT || 5000;
app.get("/",(req,res)=>{
    try{

        res.status(200).send({"name":"prem"})
    }
    catch(e)
    {
        res.status(500).send("Internal error",e)
    }
})
app.listen(port,()=>{
    console.log("Server is Started and up on",port)
})