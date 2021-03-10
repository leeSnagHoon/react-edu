const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();
const port = process.env.PORT || 8081;
const cors = require('cors');

const multer = require('multer')
const upload = multer({dest: './upload'})
const errorController = require('./controllers/errorControllers')
const db = require('./database/mysql-connect')
const users = require('./controllers/users')
const {auth} = require('./middleware/auth')



db.connect()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())


app.use('/image', express.static('./upload'))
app.post('/api/customers', upload.single('image'), async (req, res) => {

    console.debug( "call post /api/customers" )

    let sql = 'Insert into customer values (null, ?, ?, ?, ?, ?, now(), 0)'
    let image = 'http://localhost:8081/image/'+req.file.filename
    let name = req.body.name
    let birthday = req.body.birthday
    let gender = req.body.gender
    let job = req.body.job

    let params = [image, name, birthday, gender, job]
    let input = {
        'sql':sql,
        'params':params
    }
    try {
        let result = await db.query(input)
        console.log('result : '+result)
        res.send(result)
    }
    catch (err){
        console.log("err " + err)
    }

    // db.query(input, (err, rows) => {
    //     console.debug(err)
    //     console.debug("rows : "+rows)
    //
    //     res.send(rows)
    // })

})

app.get ('/api/customers', async (req, res) =>  {

    let sql = 'select * from customer where isDeleted = 0'
    let input = {
        'sql':sql
    }

    try {
        let result = await db.query(input)
        console.log('a : '+result)
        res.send(result)
    }
    catch (err){
        console.log("err " + err)
    }

    console.log("call customers")
})

app.delete('/api/customers/:id', async (req, res) => {
    console.log("delete")
    let sql = "update customer set isDeleted = 1 where id = ?"
    let input = {
        'sql':sql,
        'params':parseInt(req.params.id)
    }

    try {
        let result = await db.query(input)
        console.log('delete result : '+result)
        res.send(result)
    }
    catch (err){
        console.log("delete err " + err)
    }

    console.log("call delete")
})


app.get('/map', (req, res) =>{
    res.sendFile(__dirname + '/public/map.html');

})


app.get('/api/idCheck/:user_id', (req, res) =>{
    console.log('idCheck req : ' + JSON.stringify(req.params))
    users.integrityCheck(req, res)

})

app.post('/api/register', (req, res) =>{
    console.log('register req : ' + JSON.stringify(req.body))
    users.signUp(req, res)

})

app.post('/api/login', (req, res) =>{
    console.log('register req : ' + JSON.stringify(req.body))

    users.login(req, res)

})

app.get('/api/logout', (req, res) =>{
    console.log('logout req : ' + JSON.stringify(req.body))

    users.logout(req, res)

})

app.get('/api/auth', auth, (req, res) =>{
    let value = {
        _id:req.user_id,
        isAuth: true
    }
    res.send(value)
    console.log('/api/auth ')

    //auth.auth(req, res)

})

app.use(errorController.pageNotFoundError);
app.use(errorController.respondInternalError);
app.listen(port, () => console.log('Listening on port ' + port))