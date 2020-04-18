const express=require('express'),
    app=express();
    app.use(express.static("./"))
   
app.get('/',(req,res)=>{
    res.sendFile("home.html",{ root: "./"})
})
const port=process.env.PORT ? process.env.PORT:5000 
app.listen(port,()=>{
    console.log("server started")
})