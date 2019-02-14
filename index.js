var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/public/index.html`);
})

app.post('/results', function (req, res) {
  var link = req.body.link;
  res.sendFile(`${__dirname}/public/results.html`);
})

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))