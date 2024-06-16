import express, { Request, Response, Router } from "express";

import mongoose from "mongoose";

const app = express();
const port = 3000;
app.use(express.json())
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  job_title: String,

},{
  timestamps:true
});

const userModel = mongoose.model("user", userSchema);

app.get('/users',async(req,res)=>{
  const users = await userModel.find({})
  const html = `
  <ol>${users.map((user)=>`<li>${user.first_name} - ${user.email}  - ${user._id}</li>`).join(" ")}</ol>`
  res.send(html)
})



app.get('/api/users',async (req,res)=>{
  const users = await userModel.find({})
  res.json(users)
})



app.post("/api/users", async (req, res) => {
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

const api = app.route('/api/users/:id')

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

mongoose
  .connect(
    "mongodb+srv://docode999:docode999@cluster0.9zimmkn.mongodb.net/learnusers"
  )
  .then(() => {
    console.log("Mongodb Connected");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((e) => console.log(e));
