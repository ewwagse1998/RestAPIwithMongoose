//rest-api

const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-lab4', { useNewUrlParser: true })

const Account = mongoose.model('Account', 
    { name: String,
      balance: Number,
    })

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())


app.get('/accounts', (req, res, next) => {
  Account.find(function(err,accounts){
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      console.log(accounts)
      res.status(201).send(accounts)
      process.exit(0)
    }    
  })  
})

app.get('/accounts/:id', (req, res, next) => {
  Account.findById(req.params.id, function(err,accounts){
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      console.log(accounts)
      res.status(201).send(accounts)
      process.exit(0)
    }
  })
})  

app.post('/accounts', (req, res) => {
  const a = new Account(req.body)
  a.save(function (err){
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      console.log('account saved: ', a.toJSON())
      res.status(201).send({id: a._id})
      process.exit(0)
    }    
  }) 
})

app.put('/accounts/:id', (req, res) => {
  Account.updateOne({ _id: req.params.id },req.body,function(err, result){
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      console.log('Updated account status: ', result)
      res.status(201).send(result)
      process.exit(0)
    }
  })
})

app.delete('/accounts/:id', (req, res) => {
  Account.deleteOne({ _id: req.params.id },function(err, result){
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      console.log('Updated account status: ', result)
      res.status(201).send(result)
      process.exit(0)
    }
  })
})

 
app.listen(3000)



/*app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts)
  })



  app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body
    res.status(200).send(store.accounts[req.params.id])
  })

 */
  
  