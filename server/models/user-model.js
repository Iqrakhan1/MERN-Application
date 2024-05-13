const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    reruired: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// using pre methed we are process it first before saving data into data base
userSchema.pre("save", async function (next) {
  //this give as are usere data withe all details
  // console.log("Saving", this);
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    //its help to secure pasword or store password into hash form  bcrypt provide hashcode salt sequrity

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt);
    user.password = hash_password;
  } catch (err) {
    console.log("err", err);
    next(error);
  }
});
//compare password for tocken

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//define collection name for Mongoose
const User = new mongoose.model("User", userSchema);

module.exports = User;
