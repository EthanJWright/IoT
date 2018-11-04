const express = require('express')
const app = express()
var router = express.Router();
const port = 3000
const mqtt = require('mqtt');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


const params = {
    'base' : 'mqtt',
    'url' : 'mqtt-broker',
    'port' : '1883'
}


const con_string = `${params.base}://${params.url}:${params.port}`

const client = mqtt.connect(con_string);


app.listen(port, () => console.log(`Listening on port ${port}`));
 
app.all('*', (req, res) => {
    console.log(`In Post`);
    console.log(`Publishing to: ${req.originalUrl} with body: ${JSON.stringify(req.body)}`);
    client.on('connect', () => {
        console.log(`Publishing`);
        client.publish(req.originalUrl, JSON.stringify(req.body))
    })
    res.send('hello world')
});

