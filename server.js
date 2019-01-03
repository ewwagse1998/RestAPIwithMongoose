//rest-api

const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
let accounts = require('./routes/accounts.js')

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
app.set('Account', Account)

app.route('/accounts')
    .get(accounts.getAllAccounts)
    .post(accounts.addAccount)

app.route('/accounts/:id')
    .get(accounts.getAccount)
    .put(accounts.updateAccount)
    .delete(accounts.removeAccount)

app.listen(3000)
  