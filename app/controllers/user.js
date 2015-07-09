var User = require("../models/user")
var Suggest = require("../models/suggest")

//signup
  exports.signup = function(req, res){
    var _user = req.body.user
    User.findOne({name: _user.name}, function(err, user){
      if (err) console.log(err);

      if (user) {
        console.log("user is hased");
        return res.redirect('/')
      }
      else{
        var user = new User(_user)
        user.save(function(err, user){
          if (err) {
            console.log(err);
          };
          res.redirect("/")
        });
       };
    })
  }

  exports.signin = function(req, res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password

    User.findOne({name: name}, function(err, user){
      console.log(user);
      if (err) {
        console.log(err);
      };

      if (!user) {
        return res.redirect('/')
      };

      user.comparePassword(password, function(err, isMatch){
        if (err) {
          console.log(err);
        };

        if (isMatch) {
          req.session.user = user;
          return res.redirect('/')
        }
        else{
          return res.redirect('/')
        };
      })
    })
  }


  //logout
  exports.logout = function(req, res){
    delete req.session.user
    // delete app.locals.user

    res.redirect("/")
  }

  //userlist page
  exports.userlist = function(req, res){
    User.fetch( function (err, users) {
      if (err) {
        console.log(err);
      };

      res.render("userlist", {
        title: "imooc 用戶列表页",
        users: users
      })    
    })
  }

  //showSignin
  exports.showSignin = function(req, res){
    res.render("signin", {
      title: "imooc 登陆页面"
    })    
  }

  //showSignup
  exports.showSignup = function(req, res){
    res.render("signup", {
      title: "imooc 注册页面"
    })    
  }





  //user comment save
exports.comment = function(req, res){
  var _comment = req.body.comment
  var suggestId = req.body.sid

  Suggest.findOne({_id: suggestId}, function (err, suggest) {
    console.log(suggest);
    suggest.reply.push({from: _comment.from, to: _comment.tid, content: _comment.content})
    suggest.save()
    res.redirect('/')
  }) 
}

  //list delete movie
  exports.del = function(req, res) {
    var id = req.query.id
    console.log(id);

    if(id) {
      User.remove({_id: id}, function(err, movie) {
        if (err) {
          console.log(err);
        }
        else{
          res.json({success: 1})
        }
      })
    }
  }


  // midware for user
  exports.signinRequire = function (req, res, next){
    var user = req.session.user

    if (!user) {
      return res.redirect("/")
    };

    next()
  }

  exports.adminRequire = function (req, res, next){
    var user = req.session.user

    if (user.role <= 10) {
      return res.redirect("/")
    };

    next()
  }