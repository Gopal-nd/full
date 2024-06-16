import express from "express"
import userModel from "../models/schema"

const router = express.Router()


router.get('/users',async(req,res)=>{
    const users = await userModel.find({})
    const html = `
    <ol>${users.map((user)=>`<li>${user.first_name} - ${user.email}  - ${user._id}</li>`).join(" ")}</ol>`
    res.send(html)
  })
  
  
  
  router.get('/api/users',async (req,res)=>{
    const users = await userModel.find({})
    res.json(users)
  })
  
  
  
  router.post("/api/users", async (req, res) => {
    console.log(req.body)
    const {   first_name,
      email,
      gender,
      job_title,
      last_name, } = req.body;
    const user = new userModel({
      first_name,
      email,
      gender,
      job_title,
      last_name,
    });
  
    await user.save()
   
    res.json({msg:"created user ",user})
  
  });
  
  const api = router.route('/api/users/:id')
  
  api.get(async(req,res)=>{
    const id = (req.params.id)
    const user = await userModel.findById(id)
    res.json(user)
  })
  
  api.patch(async (req,res)=>{
    // Edit an existing user
    const {  first_name,
      email,
      gender,
      job_title,
      last_name} = req.body;
    // console.log(body)
    const id = (req.params.id);
    const exist = await userModel.findById(id);
    if(!exist){
      res.json({msg:"user not exist"})
    }
    const userToEdit = await userModel.findByIdAndUpdate(id,{
      first_name,
      email,
      gender,
      job_title,
      last_name
    })
  
  
  res.json({msg:"uppdated "})
  })
   
  api.delete(async(req,res)=>{
    const id = (req.params.id)
    console.log(id)
    const exist = await userModel.findById(id);
    if(!exist){
      res.json({msg:"user not exist"})
    }
    await userModel.findByIdAndDelete(id)
  
  return res.json({status:"deleted"})
  })

  export default router