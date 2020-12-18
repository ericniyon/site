const express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient
const app = express();


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
const ConnectionString = 'mongodb+srv://eric:imananiyonkuru1@7hills.5ri2a.mongodb.net/7hills?retryWrites=true&w=majority'

MongoClient.connect(ConnectionString, {useUnifiedTopology: true}).then(
    client => {
        const db = client.db('7hills')
        const commentsCollection = db.collection('comments')
        // app.use(/*....*/)
        // app.get(/*....*/)
        // app.post(/*....*/)
        // app.listern(/*....*/)
        app.post("/pages/comments", (req, res) => {
            console.log(req.body)
            commentsCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.get('/', (req, res) => {
            db.collection("comments").find().toArray()
                .then(results => {
                    console.log(results)
                    res.render('views/index.ejs')
                })
                .catch(error => console.error(error))
            res.render('views/index.ejs', {})
        })

    })
    .catch(console.error)


const PORT = process.env.PORT || 5000 // my server port number

app.use(express.static("public")) //including static files in my application

// home page of site
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/pages/index.html')
})

// app.post("/pages/comments", (req, res) => {
//     commentsCollection.insertOne(req.body)
//         .then(result => {
//             console.log(result)
//         })
//         .catch(error => console.error(error))
// })




app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})