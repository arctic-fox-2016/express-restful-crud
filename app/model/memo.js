var mongoose = require('mongoose')
var memoSchema = new mongoose.Schema({
  name: String
})
mongoose.model('Memo',memoSchema)
