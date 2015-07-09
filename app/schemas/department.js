var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var DepartmentSchema = new mongoose.Schema({
  name: String,
  suggests: [{type: ObjectId, ref: 'Suggest' }],
  meta:{
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    },
  }
})


DepartmentSchema.pre("save", function(next){
  if (this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else{
    this.meta.updateAt = Date.now()
  }
  next()
})

DepartmentSchema.statics = {
  fetch: function(cb, next){
    return this
      .find({})
      .sort("meta.updateAt")
      .exec(cb,next)
  },
  findById: function(id, cb){
    return this
      .findOne({_id: id})
      .exec(cb)
  }  
}

module.exports = DepartmentSchema