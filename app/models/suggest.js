var mongoose = require("mongoose")
var SuggestSchema = require("../schemas/suggest")
var Suggest = mongoose.model("Suggest", SuggestSchema)

module.exports = Suggest