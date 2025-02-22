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
    .catch(error => console.error(error))

app.get('/',async (request, response)=>{
    console.log("Just got a request!")
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    if(2===4) console.log(3)
    //response.send('BetterBytes with MongoDB toString!'+db.toString())
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error)) 
})

app.post('/addTodo', (request, response) => {
    console.log(request.body)
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Uncomplete')
        response.json('Marked Uncomplete')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})
// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('BetterBytes!')
// })
app.listen(process.env.PORT || PORT)