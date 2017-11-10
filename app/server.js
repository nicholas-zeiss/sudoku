/**
 *
 *	Barebones express server, only has to serve up static files
 *
**/ 


const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

const port = process.argv[2] ? Number(process.argv[2]) : 3000;

app.listen(port, () => console.log('listening on port ', port));

