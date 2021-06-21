const express=require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const User = require("./User")
const cors = require("cors");
require("dotenv").config();
const app=express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
const con = mongoose.connection;

mongoose.set("useCreateIndex", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/",(req,res)=>{
    try{

        res.status(200).send({"name":"prem"})
    }
    catch(e)
    {
        res.status(500).send("Internal error",e)
    }
})

app.post("/add",(req,res)=>{
    console.log("Inside Add route")
    try{
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            age: req.body.age
          });
          user
            .save().then((result) => {
                res.status(201).json({
                  message: "User registered successfully!",
                });
              })
              .catch((err) => {
                console.log(err),
                  res.status(500).json({
                    error: err,
                  });
              });
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
app.listen(port,()=>{
    console.log("Server is Started and up on",port)
})