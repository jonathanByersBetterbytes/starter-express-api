const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('BetterBytes!')
})
app.listen(process.env.PORT || PORT)