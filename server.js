const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8081;
const cors = require('cors');
const fs = require('fs')
const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data)
const mysql = require('mysql')
const multer = require('multer')
const upload = multer({dest: './upload'})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


app.use('/image', express.static('./upload'))
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'Inset into customer values (null, ?,?,?,?,?)'
    let image = '/image/'+req.file.fileName
    let name = req.body.name
    let birthday = req.body.birthday
    let gender = req.body.gender
    let job = req.body.job
    let params = [image, name, birthday, gender, job]
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows)
    })

})

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


app.get('/map', (req, res) =>{
    res.sendFile(__dirname + '/public/map.html');

})

app.get('/sign-up', (req, res) =>{

    signUp(req, res)
})

async function signUp(req, res) {
    const  {password, salt} = await createHashedPassword(req.body.user.password);
    connection.query(
        "select * from customer",
        (err, row, fields) => {
            console.log("row : " + JSON.stringify(row))

            res.send(row)
        }
    )
}

app.get('/api/customers', (req, res) => {

    connection.query(
        "select * from customer",
        (err, row, fields) => {
            console.log("row : " + JSON.stringify(row))

            res.send(row)
        }
    )
    console.log("call customers")
})

const  createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });

const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

app.listen(port, () => console.log('Listening on port ' + port))