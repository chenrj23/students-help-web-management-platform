var Department = require("../models/department")


// index page
exports.index = function(req, res){
  id = req.query._id
  Department.find({_id: id})
      .populate("suggests")
      .exec(function(err, department){
        department = department[0]
        res.render("department", {
          title: department.name + '部门',
          department: department,
          suggests: department.suggests
        })
      })

}


exports.admin = function(req, res){
    Department.fetch(function (departments) {
        res.render("departmentAdmin", {
            title: "部门录入首页",
            departments: departments
        })           
    })
}


exports.list = function(req, res){
  Department.fetch( function (err, departments) {
    console.log("departments:");
    console.log(departments);
      res.render("departmentList", {
          title: "部门列表",
          departments: departments
      })           
  })
}
  
exports.save = function(req, res){
  var _department = req.body.department

  var department = new Department(_department)

  department.save(function(err, department){
    if (err) {
      console.log(err);
    };

    res.redirect("/admin/department/list" )
  })

}

//department delet
exports.del = function(req, res) {
  var id = req.query.id

  if(id) {
    Department.remove({_id: id}, function(err, department) {
      if (err) {
        console.log(err);
      }
      else{
        res.json({success: 1})
      }
    })
  }
}
