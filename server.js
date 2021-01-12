const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/hello', (req, res) =>{
    res.send({message: "hello"})
})

app.get('/api/customers', (req, res) => {
    console.debug("call customers")
    res.send([{
        'id':'1',
        'image':'https://placeimg.com/64/64/1',
        'name': 'jone',
        'birthday': '20083229',
        'gender': 'male',
        'job': 'student'

    },{
        'id':'2',
        'image':'https://placeimg.com/64/64/2',
        'name': 'tom',
        'birthday': '20083231',
        'gender': 'female',
        'job': 'student'

    },{
        'id':'3',
        'image':'https://placeimg.com/64/64/3',
        'name': 'lee',
        'birthday': '20083230',
        'gender': 'male',
        'job': 'teacher'

    }])
})



app.listen(port, () => console.log('Listening on port ' + port))