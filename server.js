const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = process.env.PORT || 5000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}))
server.get('/hello', (req, res) =>{
    res.send({message: "hello"})
})

server.listen(port, () => console.log('Listening on port ' + port))