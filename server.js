const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const fs = require('fs')
const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data)
const mysql = require('mysql')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

connection.connect()

app.get('/hello', (req, res) =>{
    res.send({message: "hello"})
})

app.get('/api/customers', (req, res) => {

    connection.query(
        "select * from customer",
        (err, row, fields) => {
            console.log("row : " + JSON.stringify(row))

            res.send(row)
        }
    )
    console.debug("call customers")
})



app.listen(port, () => console.log('Listening on port ' + port))