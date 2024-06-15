import express from "express"
import fs from "fs"
const app = express()
const port = 3000


interface CustomRequest extends Request{
  ip: any
  myname?:string
}

app.use((req: CustomRequest,res:any,next:any)=>{
  if(req.url == '/favicon.ico') return
 fs.appendFile('log.txt',`${Date.now()} :${req.method} : ${req.url} :>> ${req.ip} \n`,(err)=>{
  if(err){
    console.log(err)
  }
 })
  console.log('middlewaere will be running');
  req.myname = "gopal";
  next();
})
app.get('/', (req :CustomRequest, res:any) => {
  console.log(req.myname )
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})