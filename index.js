var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin@123',
  database: 'test2'
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/login', function (req, res) {
console.log("coming");
//console.log(req.body);
var  Userid=req.body.userid;
var password=req.body.pwd;
console.log(Userid);
console.log(password);

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')

  
    connection.query('INSERT INTO people (username, password) VALUES (?, ?)', [Userid,password], function(err, result) {
      if (err) throw err
      connection.query('SELECT * FROM people', function(err, results) {
        if (err) throw err
        
      
    })
  }) 
})


})

router.post('/registration', function(req, res, next) {
  res.render('registration');
});




router.post('/regist',function(req,res){
  var users={
   Name:req.body.name,
   Sur_Name:req.body.Sur_Name,
   Date_of_Birth:req.body.date_of_birth,
   Address:req.body.address,
   Phone:req.body.phone,
   Email:req.body.email,
   Zip:req.body.zip
  
  
  }

console.log(users);
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
    }
    });
})

module.exports = router;
