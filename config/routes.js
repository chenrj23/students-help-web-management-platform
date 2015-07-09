var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Student = require('../app/controllers/student')
var Admin = require('../app/controllers/admin')
var Department = require('../app/controllers/department')
var DepartmentDB = require("../app/models/department")


module.exports = function(app){
    //pre handle user
  app.use(function(req, res, next){
    var _user = req.session.user

    app.locals.user = _user

    next()     
  })

  //pre department
  DepartmentDB.find({},function (err, department) {
    var _departments =department
    app.locals.departments = _departments
  })
   


  //Index
  app.get("/", Index.index)

  //student
  app.get("/student", User.signinRequire, Student.index)
  app.post("/student/suggest/save", User.signinRequire, Student.save)


  //admin
  app.get("/admin", User.signinRequire, User.adminRequire, Admin.index)
  app.put("/admin/suggest/to", User.signinRequire, User.adminRequire, Admin.to_update)
  app.delete('/admin/suggest', User.signinRequire, User.adminRequire, Admin.del)

  //department
  app.get("/department", User.signinRequire, User.adminRequire, Department.index)
  app.get("/admin/department",User.signinRequire, User.adminRequire, Department.admin)
  app.get("/admin/department/list",User.signinRequire, User.adminRequire, Department.list)
  app.post("/admin/department/save", User.signinRequire, User.adminRequire, Department.save)
  app.delete('/admin/department', User.signinRequire, User.adminRequire, Department.del)


  //suggest



  //User
  app.post("/user/signup", User.signup)
  app.post("/user/signin", User.signin)
  app.post("/user/comment", User.comment)
  app.get("/logout", User.logout)



  
  // app.get("/signin", User.showSignin)
  // app.get("/signup", User.showSignup)
  // app.get("/admin/user/list", User.signinRequire, User.adminRequire, User.userlist)
  // app.delete('/admin/user/list', User.signinRequire, User.adminRequire, User.del)

  //Movie
  // app.get("/movie/:id", Movie.detail)
  // app.get("/admin/movie/update/:id", User.signinRequire, User.adminRequire, Movie.update)
  // app.post("/admin/movie/new", User.signinRequire, User.adminRequire, Movie.save)
  // app.get("/admin/movie", User.signinRequire, User.adminRequire, Movie.new)
  // app.get("/admin/movie/list", User.signinRequire, User.adminRequire, Movie.list)
}
