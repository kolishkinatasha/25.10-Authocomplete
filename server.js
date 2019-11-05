const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { countries } = require('./data');

const app = express();

app.use(bodyParser());
app.use(express.static(join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.post('/countries', (req, res) => {
    const { input, options } = req.body.params;
    const data = options.filter(
        item => {
            if (item.toLowerCase().indexOf(input) === 0) return item;
        }
    );
    res.send(data);
});

app.listen(3000, () => console.log('port 3000'));
