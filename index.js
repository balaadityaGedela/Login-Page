import express from "express";
import bodyParser from "body-parser";

// creating dirname fr file transfer
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

var dict = [{username:"Balaaditya",password:"12345"}];
var inputUsername = "";
var inputPassword = "";
const app = express();

// body parser
app.use(bodyParser.urlencoded({extended:true}));

// custom middleware 
function custom_name(req,res,next)
{
    console.log(req.body);
    inputUsername = req.body["userName_value"];
    inputPassword = req.body["password_value"];
    next();
}

app.use(custom_name);



app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/public/index.html");
});

app.get("/styles.css",(req,res)=>
{
    res.sendFile(__dirname+"/public/styles.css");
});

app.get("/styles2.css",(req,res)=>
{
    res.sendFile(__dirname+"/public/styles2.css");
});

app.get("/styles3.css",(req,res)=>
{
    res.sendFile(__dirname+"/public/styles3.css");
});

app.post("/register",(req,res)=>
{
    res.sendFile(__dirname+"/public/index2.html");
});

app.post("/login",(req,res)=>
{
    console.log(req.body);
    // use from the custom middleware
    // res.sendFile(__dirname+"/public/index.html");
    var i=0;
    var check = false;
    for(i =0;i<dict.length;i++)
    {
        if(dict[i].username == inputUsername)
        {
            check = true;
            break;
        }
    }
    if(check)
    {
        if(inputPassword == dict[i].password)
        {
            res.sendFile(__dirname+"/public/secret.html");
        }
        else
        {
            console.error("Wrong password")
            // res.sendFile(__dirname+"/public/index.html");
            res.redirect("/");
        }
    }
    else
    {
        
        // res.sendFile(__dirname+"/public/index.html");
        res.redirect("/");
        // this redirect goes back to the same url, but if use sendFile, thn u can check tht we hav diff url, we hav "/login" extra added to the url
    }
});

app.post("/",(req,res)=>
{
    res.sendFile(__dirname+"/public/index.html");
})

app.post("/registered",(req,res)=>
{
    console.log(req.body);
    var inputUsername1 = req.body["userName_value"];
    var inputPassword1 = req.body["password_value"];
    var pair = dict.push({username:inputUsername1,password:inputPassword1}); 
    res.sendFile(__dirname+"/public/index.html");
    console.log(dict);
});

// starting the server
const port = 3000;
app.listen(port,()=>
{
    console.log(`Server has started running in ${port}`);
});