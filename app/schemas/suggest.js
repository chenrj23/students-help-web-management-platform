var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var SuggestSchema = new mongoose.Schema({
  from: {type: ObjectId, ref: 'User' },
  reply: [{
    from: {type: ObjectId, ref: 'User' },
    to: {type: ObjectId, ref: 'User' },
    content: String
  }],
  to: {type: ObjectId, ref: 'Department' },
  content: String,
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


SuggestSchema.pre("save", function(next){
  if (this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else{
    this.meta.updateAt = Date.now()
  }
  next()
})

SuggestSchema.statics = {
  fetch: function(cb){
    return this
      .find({})
      .sort("meta.updateAt")
      .exec(cb)
  },
  findById: function(id, cb){
    return this
      .findOne({_id: id})
      .exec(cb)
  }  
}

module.exports = SuggestSchema