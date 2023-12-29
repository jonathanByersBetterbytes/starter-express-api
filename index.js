const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
const cors = require('cors')
app.use(cors())
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

let db,
    dbConnectionStr = 'mongodb+srv://jonathankbyers:02S6kDc3hv9J0oMX@testingcluster.wdoczch.mongodb.net',
    dbName = 'rap'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('BetterBytes!')
})
app.listen(process.env.PORT || PORT)