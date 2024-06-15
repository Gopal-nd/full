const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')
const app = express();

app.use(express.json())

app.get('/users',(req,res)=>{
    const html = `
    <ol>${users.map((user)=>`<li>${user.first_name}</li>`).join(" ")}</ol>`
    res.send(html)
})
app.get('/api/users',(req,res)=>{
    res.json(users)
})
app.post('/api/users',(req,res)=>{
    const body = req.body;
    users.push({...body,id:users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
        if(err){
            console.log(err)
        }
    res.send({id:users.length})
    })
})


const api = app.route('/api/users/:id')

api.get((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id===id)
    res.json(user)
})

api.post((req,res)=>{
    const body = req.body;
    console.log(body)
    // To Create new user 
    return res.json({status:"Pending"})
})

api.patch((req,res)=>{
    // Edit an existing user 
    const body = req.body;
    // console.log(body)
    const id = Number(req.params.id);
    const userToEdit = users.findIndex((user)=>user.id===id)
        const data = {
            ...users[id]
            ,...body
        }
const updatedUser = {...users[userToEdit],...body}
users[userToEdit]= updatedUser
fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
    if(err){
        console.log(err)
    }
})

res.send({msg:"uppdated "})
})

api.delete((req,res)=>{
    // Edit an existing user 
    const id = Number(req.params.id);
    const userToEdit = users.filter((user)=>user.id===id)
    users.pop(userToEdit)
    // console.log(users)
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
        if(err){
            console.log(err)
        }
    })
   
return res.json({status:"deleted"})
})


// app.get('/api/users/:id',(req,res)=>{
//   const id = Number(req.params.id)
//   const user = users.find((user)=>user.id===id)
//   res.json(user)
// })


// app.post('/api/users',(req,res)=>{
//     // To Create new user 
//     return res.json({status:"Pending"})
// })

// app.patch('/api/users/:id',(req,res)=>{
//     // Edit an existing user 
//     return res.json({status:"Pending"})
// })

// app.delete("/api/users/:id",(req,res)=>{
//         // Edit an existing user 
//     return res.json({status:"pending"})
// })


app.listen(3000,()=>{
    console.log('Server Running!')
})

