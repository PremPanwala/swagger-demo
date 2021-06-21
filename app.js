const express=require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const EMP = require("./User")
const cors = require("cors");
require("dotenv").config();
var jwt = require('jsonwebtoken');
const app=express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
const con = mongoose.connection;

mongoose.set("useCreateIndex", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/",(req,res)=>{
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, "prem", async function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      try{

        res.status(200).send({"name":"prem"})
    }
    catch(e)
    {
        res.status(500).send("Internal error",e)
    }
    })
    
})

app.post("/add",(req,res)=>{
    console.log("Inside Add route")
    console.log(req.body.username,req.body.age)
    try{
        const user = new EMP({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            age: req.body.age
          });
          user
            .save().then((result) => {
                var token = jwt.sign({ id: result._id }, "prem", {
                  expiresIn: 86400 // expires in 24 hours
                });
                res.status(201).json({
                    message: "User registered successfully!",
                    token
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