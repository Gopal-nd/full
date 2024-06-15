const http = require("http")
const fs = require('fs')
const url = require("url")
const myServer = http.createServer((req, res)=>{
// console.log(req)
if (req.url ==='/favicon.ico') return res.end();
const log = `${Date.now()} Request recived ${req.url} \n`
const myUrl = url.parse(req.url);
// console.log(myUrl)
fs.appendFile('./log.txt',log,(err,data)=>{
    if(!err === undefined){
        console.log(err)
    }else{
        if (req.url ==='/favicon.ico') return res.end();
        switch(req.url){
            case '/':
                res.end("homepage");
                break;
            case '/about':
         
            res.end("I am gopal reddy");
            break;
            default:
                
           
                res.end("404 error")
        }
      
    }
})
});

myServer.listen(8000,()=>{
    console.log("runing in port 8000");
})