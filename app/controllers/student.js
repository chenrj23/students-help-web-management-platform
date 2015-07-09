var Suggest = require("../models/suggest")

 // index page
exports.index = function(req, res){
  var stuId = req.query.stuId
  Suggest.find({from: stuId}, function (err, suggests) {
    console.log(suggests);
    res.render("student", {
      title: "学生首页",
      suggests: suggests
    })
  })

}


//suggest save
exports.save = function(req, res){
  var suggest = req.body.suggest
  console.log(suggest);
  var _suggest 

  _suggest = new Suggest({
    content: suggest.content,
    from: suggest.from
  })

  _suggest.save(function(err, suggest){
    if (err) {
      console.log(err);
    };  
    res.redirect("/student?stuId=" + suggest.from)
  })  
}
