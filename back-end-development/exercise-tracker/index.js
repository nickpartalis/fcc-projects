const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Middleware
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// Schema & model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  exercises: [
    {
      description: { type: String, required: true },
      duration: { type: Number, required: true },
      date: String,
      _id: false
    }
  ]
})
const User = mongoose.model("User", userSchema)

// Controllers
const getAllUsers = (req, res) => {
  User.find({}).select("username _id")
    .then(users => res.send(users))
    .catch(err => {
      console.error(err)
      res.json({ error: "Something went wrong"})
    })
}

const createUser = (req, res) => {
  User.create({ username: req.body.username })
    .then(newUser => {
      res.json({ username: newUser.username, _id: newUser._id })
    })
    .catch(err => {
      console.error(err)
      res.json({ error: "Something went wrong"})
    })
}

const createExercise = (req, res) => {
  const userId = req.params._id
  const date = req.body.date || new Date().toISOString().slice(0, 10)
  
  const newExercise = {
    description: req.body.description,
    duration: +req.body.duration,
    date: date
  }
    
  User.findByIdAndUpdate(
    userId, 
    { $push: { exercises: newExercise } }, 
    { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        res.json({ error: "Invalid user id"})
        return
      }
      res.json({
        ...newExercise,
        _id: userId,
        username: updatedUser.username,
        date: new Date(date).toDateString()
      })
    })
    .catch(err => {
      console.error(err)
      res.json({ error: "Something went wrong"})
    })
}

const getExerciseLog = (req, res) => {
  const from = req.query.from || "0000-00-00"
  const to = req.query.to || "9999-99-99"
  const limit = req.query.limit || 1000

  const idObj = new mongoose.Types.ObjectId(req.params._id)
  User.aggregate([
    { 
      $match: { _id: idObj } 
    },
  {
    "$addFields": {
      "exercises": {
        "$filter": {
          "input": "$exercises",
          "as": "ex",
          "cond": { $and: [
            { $gte: [ "$$ex.date", from ] },
            { $lte: [ "$$ex.date", to ] }
          ]},
          "limit": +limit
        }
      }
    }
  }
  ])
    .then(result => {
      const exercises = result[0].exercises.map(ex => ({
        ...ex, date: new Date(ex.date).toDateString()
      }))
      res.json({
        _id: result[0]._id,
        username: result[0].username,
        count: exercises.length,
        log: exercises
      })
    })
    .catch(err => {
      console.error(err)
      res.json({ error: "Something went wrong"})
    })
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app
  .route("/api/users")
  .get(getAllUsers)
  .post(createUser)

app.post("/api/users/:_id/exercises", createExercise)

app.get("/api/users/:_id/logs", getExerciseLog)



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
