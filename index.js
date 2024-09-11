import connectDB from './db/db.js'
import dotenv from 'dotenv'
import express from 'express'
import User from './model/userModel.js'

const app = express()

dotenv.config()
connectDB()

app.get('/', (req,res)=>{
    res.send(`Welcome to GoMyCode`)
})

app.get('/add/:name/:age', async(req, res)=>{
    const {name, age } = req.params
    const result = await User.create({name:name, age:age})
    console.log(result);
    res.send(result)

})

app.listen(3002, ()=>{
    console.log('server is running on port 3002')
})