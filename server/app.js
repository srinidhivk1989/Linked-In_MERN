//express server
//server code

var express=require('express');
var cors=require('cors');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var app=express();
var User=require('./models/User');
var Post=require('./models/Post')


mongoose.connect('mongodb://localhost:27017/linkedin_workshop');
//middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/api/test',function(req,res){
  res.send('hello api');
});
app.post('/api/register',function(req,res){
User.create(req.body)
.then(function(user){
  res.send({status:'success',message:'User created in database'});
  console.log(user);
}).catch(function(error){
  console.log(error);
});

});
app.post('/api/login',function(req,res){
  User.findOne({
    email:req.body.email,
    password:req.body.password
  })
  .then(function(user){
    if(!user){
      return res.send({status:'error',message:'no user found'});
    }

    res.send(user);
  }).catch(function(error){
    console.log(error);
    res.send({status:'error',message:'db problem'});
  });
});
app.get('/api/members',function(req,res){
  User.find({})

    .then(function(members){
      res.send(members);
    }).catch(function(error){
      console.log(error);
      res.send({status:'error',message:'db problem'});
    });


});
app.get('/api/members/:id',function(req,res){
  User.findById(req.params.id)
  .then(function(user){
    if(!user){
      return res.send({status:'error',message:'no user found'});
    }
    res.send(user);
  })

  .catch(function(error)
{
  res.send({status:'error',message:'db problem'});
})
});

});
app.listen(8080);
