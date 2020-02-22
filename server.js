const fs=require("fs");

const express =require('express');

const hbs=require('hbs');
 
var app=express();

hbs.registerPartials(__dirname+"/views/partials")

hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase();
})

hbs.registerHelper("getFullYear",()=>{
    return new Date().getFullYear();
});

app.set('view engine','hbs');



app.use((req,res,next)=>{
    var date=new Date();
    var log=date +": " +req.method +req.url;
    console.log(log);
    fs.appendFile("request.log",log+"\n",(err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
})

// app.use((req,res,next)=>{
//     res.render("maintainence.hbs");
// })

app.use(express.static(__dirname + "/public"));

app.get('/',(req,res) => {
    // res.send({name:'narender', 
    //     age:22,
    //     like:['basketball','vollyball','cricket']});
    res.render('home.hbs',{
        pageTitle:'Home Page',
        msg:"Hello welcome to my Kingdom"
        
        });
});


app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle:"Hello this is Me",
    });
});

app.get('/bad',(req,res) => {
    res.send({errorMessage:"Sorry wrong api hit"});
});


app.listen(3000,()=>
{
    console.log("Server is up at port 3000");
});