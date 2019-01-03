//Lab 4 accounts

module.exports = {
    getAllAccounts(req, res) {
        let Account = req.app.get('Account');
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
    },
    getAccount(req, res){
        let Account = req.app.get('Account');
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
    },
    addAccount(req, res) {
        let Account = req.app.get('Account');
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
    },
    updateAccount(req, res) {
        let Account = req.app.get('Account');
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
    },
    removeAccount(req, res) {
        let Account = req.app.get('Account');
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
    }
  }