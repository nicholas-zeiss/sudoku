var express = require('express');

var app = express();

app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res) {
	res.render('index.html')
});

app.listen(process.env.PORT || 3000, () => console.log('listening on port 3000'));