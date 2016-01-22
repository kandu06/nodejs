var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public')); //use will be used by express before executing any other route. here public folder is setup as static. eg, localhost:5000/css/styles.css
app.use(express.static('src/views')); //src/views is also set up as static folder. any contents within these folders can be accessed by providing the name of the file in url, eg. localhost:5000/index.html

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/books', function (req, res) {
    res.send('hello books');
});

app.listen(port, function (err) {
    console.log('express server running on port ' + port + '....');
});