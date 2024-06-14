const fs = require('fs')
const os = require('os')
// sync
// fs.writeFileSync("./example.txt","hdskjh")
// fs.writeFile("./async.txt","hdskjh",(err)=>{
//   console.log("file crated");
//   if(err){
//     console.log(err)
//   }
// })
console.log(os.cpus().length)
fs.readFile("./contact.txt","utf-8",(err,res)=>{
    if(err){
        console.log("Got an error : ",err)
    }else{
        console.log(res)
    }
})

fs.appendFileSync('./contact.txt',`hey the time is \n`)
fs.appendFileSync('./contact.txt',new Date().getDate().toLocaleString())
fs.appendFileSync('./contact.txt','\n')

fs.cpSync('./contact.txt','./copy.txt',)
fs.unlink('./copy.txt',(err)=>{
    console.log(err)
})

console.log(fs.statSync('./contact.txt').isFile())

fs.mkdirSync("system-logs",{recursive:true})

fs.rmdirSync("system-logs",{recursive:true})