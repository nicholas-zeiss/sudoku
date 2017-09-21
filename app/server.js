var express = require('express');
const path = require('path');

var app = express();

console.log(path.join(__dirname, '.'), path.join(__dirname, './index.html'))

app.use(express.static(path.join(__dirname, '.')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, './index.html'));
});


app.listen(process.env.PORT || 3000, () => console.log('listening on port 3000'));

