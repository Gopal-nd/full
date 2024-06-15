const express = require('express')
const path = require('path')
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello form express server")
})
app.get('/about',(req,res)=>{
    res.sendFile(__dirname+"/public/about.html")
})
app.get('/contact',(req,res)=>{
    res.sendFile(__dirname+"/public/contact.html")
})
app.post('')

app.listen(3000,()=>{
    console.log('Server started!')
})