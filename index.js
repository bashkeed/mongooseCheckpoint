import connectDB from './db/db.js'
import dotenv from 'dotenv'
import express from 'express'
import User from './model/userModel.js'

const app = express()

dotenv.config()
connectDB()




app.get('/', (req,res)=>{
    res.send('<h2 style=color:orange;text-align:center >Welcome to Gomycode</h2>')
})

app.get('/add/:name/:age', async(req, res)=>{
    const {name, age } = req.params
    const result = await User.create({name:name, age:age})
    console.log(result);
    res.send(result)

})

// question 1
app.get('/records',async(req,res)=>{
    try {
        
        const person = new User({
            name:'lola',
            age:25,
            favoriteFoods:['pizza','beans','spaghetti']
        },)
        const addedPerson = await person.save()
        console.log(addedPerson);
        res.json(addedPerson)
        

    } catch (error) {
        console.log(`error ${error}`)
        res.json(error)
    }
    
})


//question 2

const arrayOfPeople =[{name:'mudsdssha ibn umar khawarismi', age:100,favoriteFoods:['millet','guinea corn','rice']},
                      {name:'isaasdsdsas bashir',age:20,favoriteFoods:['jollof','tuwo','shinkafa']},
                      {name:'hasddsdssdfsa',age:18,favoriteFoods:['pasta','indomie','plantain']}]

app.get('/people', async(req,res)=>{
    try {
        const result = await User.create(arrayOfPeople)
        console.log(`inserted ${result.length} documents`);
        res.send({count:result.length, ...result})
        
    } catch (error) {
        
        console.log('error sending data',error)
    }
})

//question 3

app.get('/find', async(req,res)=>{
    try {
        const result = await User.find()
        res.json(result)
        
    } catch (error) {
        console.log('error sending data',error)
    }
})

//question 4
app.get("/findOne", async (req, res) => {
  try {
    const result = await User.findOne({
        favoriteFoods:'rice'
    });
    res.json(result);
  } catch (error) {
    console.log("error sending data", error);
  }
});

//question 5
app.get("/findByID", async (req, res) => {
  try {
    const result = await User.findById({
      _id: "66e19a3284d99afdb48520c5",
    });
    res.json(result);
  } catch (error) {
    console.log("error sending data", error);
  }
});

// Question 6
app.get('/findUpdateById',async(req,res)=>{
  const findRecord = await User.findById({
    _id: "66e19a3284d99afdb48520c5",
  });
  const newFood='Hambuger'
  findRecord.favoriteFoods.push(newFood)
  await findRecord.save();
  console.log(findRecord)
  res.json(findRecord)
})


// Question 7
app.get('/findOneAndUpdate',async(req,res)=>{
  const findRecord = await User.findOneAndUpdate({
    name:'taslima'
  },{
    age:25
  },{
    new:true
  })
  console.log(findRecord)
  res.json(findRecord)
})


// Question 8
app.get('/findByIdAndRemove',async(req,res)=>{
  const findRecord = await User.findByIdAndDelete("66e1a64b32a27943a66d1cee");
  console.log(findRecord)
  res.json(findRecord)
})


// Question 9
app.get('/remove',async(req,res)=>{
  const findRecord = await User.deleteMany({
    name: "isaasas bashir",
  });
  console.log(findRecord)
  res.json(findRecord)
})


// Question 10
app.get('/chainSearch',async(req,res)=>{
  const findRecord=await User.find({
    favoriteFoods:'beans'
  }).sort({
    name:1
  }).limit(2).select(
    '-age'
  )

  console.log(findRecord)
  res.json(findRecord)
})

const port= 3002;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})