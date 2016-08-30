const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  // need to enforce uniqueness of email
  // also make sure lowercase
  email: { type: String, unique: true, lowercase: true },
  password: String
});


// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
