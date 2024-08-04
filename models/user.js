const mongoose = require("mongoose");
const validator = require("validator"); //email validate krvaaaa
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, //badhi info mangaav se tyaare password nai jsse
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// ==========================================================


//Password encrypt krvaaaaaaa
// / jyaare jyaare schema save thse tyaare aa call thsee
userSchema.pre("save", async function (next) {  //arrow function ni unrr this use nai thaai etle function

    //evrry time userSchema update thse to password b hash thaya jj krse etle
    //  ene avoid krvaa maate if...
    if (!this.isModified("password")) {
    next();//password modified nathi so password hash nai krvaa no ...direct next
  }

  this.password = await bcrypt.hash(this.password, 10);
});



// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};




// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")//algorithm che
    .update(resetToken)//
    .digest("hex");//buffer ne string ma return krse=="hex"

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};



module.exports = mongoose.model("User", userSchema);