var Suggest = require("../models/suggest")
var Department = require("../models/department")
// index page
exports.index = function(req, res){
  Suggest
    .find()
    .populate('from', 'name')
    .populate('to', 'name')
    .exec(function (err, suggests) {
      Department.fetch(function (err, departments) {

        res.render("admin", {
          title: "管理员首页",
          suggests: suggests,
          departments: departments
        })                    
      })
    })
 }
  


// suggest to_update
exports.to_update = function(req, res){
  var cat_id = req.query.catId
  var rawCat_id = req.query.rawcatId
  var suggest_id = req.query.itemId


  Suggest.update({_id: suggest_id}, {to: cat_id}, function (err, suggest) {

    Department.findOne({_id: cat_id}, function (err, department) {
      if (err) {
        throw err
      };

      department.suggests.push(suggest_id)
      department.save(function(err){
        Suggest.find({_id: suggest_id})
          .populate('to')
          .exec(function (err, suggest){
            res.json({
              success: 1,
              toDepartment: suggest[0].to.name
            })
          })       
      })
    })
  })
}

//suggest delet
exports.del = function(req, res) {
  var id = req.query.id

  if(id) {
    Suggest.remove({_id: id}, function(err, suggest) {
      if (err) {
        console.log(err);
      }

      res.json({success: 1})
      
    })
  }
}
