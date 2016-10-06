var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/intro');
var RabbitSchema = new mongoose.Schema({
  name: String,
  age: Number
});
mongoose.model('Rabbit', RabbitSchema);
var Rabbit = mongoose.model('Rabbit');

app.get('/', function(req, res){
  Rabbit.find({}, function(err, rabbits) {
    if (err) {
      console.log('something went wrong');
    } else {
      console.log('successfully retrieved users');
      res.render('index', {rabbits: rabbits});
    }
  })
})

app.post('/rabbits', function(req, res){
  console.log('POST DATA', req.body);
  var rabbit = new Rabbit({name: req.body.name, age: req.body.age});
  rabbit.save(function(err){
    if (err) {
      console.log('something went wrong');
    } else {
      console.log('successfully added a user!');
    }
  })
  res.redirect('/');
})

app.listen(8000, function(){
  console.log('listening on port 8000');
})
