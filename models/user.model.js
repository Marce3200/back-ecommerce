const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    uppercase: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    default: true,
  },

  
  salt: String, //para password
});

userSchema.plugin(uniqueValidator, { message: 'username is already registered' });

userSchema.methods.hashPassword = function (password) { // encripta la contrase;a
  this.salt = crypto.randomBytes(16).toString("hex");// codigo aleatorio definido. Se agrega antes de hashear el password. Aunque 2 usuarios tengan el mismo pass, el salt es un extra que los diferencia.
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

userSchema.methods.validPassword = function (password) {//
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return this.password === hash;
}

const user = mongoose.model("users", userSchema);
module.exports = user;