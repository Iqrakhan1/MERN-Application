//home page logic
const User = require("../models/user-model");

const home = async (req, res) => {
  //start logic
  try {
    res.status(200).send("welcome auth controller");
  } catch (err) {
    console.log(err);
  }
};

//--------------register logic ---------------//

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "user already exist!" });
    }
    //its help to sequre pasword or store password into hash form  bcrypt provide hashcode salt sequrity

    // const salt = 10;
    // const hash_password = await bcrypt.hash(password, salt);

    const userCreate = await User.create({
      username,
      email,
      phone,
      password,
      // : hash_password,
    });
    const token = await userCreate.generateToken();
    res.status(201).json({
      msg: "resitration successfuly",
      token,
      userId: userCreate._id.toString(),
    });
  } catch (err) {
    // res.status(500).json({ msg: "internal server error" });
    next(err);
  }
};

//************ User login function **************//

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Logging the email and password received from the request
    console.log("Email:", email);
    console.log("Password:", password);

    // Attempting to find a user with the provided email in the database
    const userExist = await User.findOne({ email });
    console.log("User Exist:", userExist);

    if (!userExist) {
      // If no user is found, return a 400 status with an error message
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // Comparing the provided password with the hashed password stored in the database
    const Matchpass = await userExist.comparePassword(password);

    if (Matchpass) {
      // If passwords match, generate a token for authentication
      const token = await userExist.generateToken();

      // Return a 201 status indicating successful registration along with the token and user ID
      return res.status(201).json({
        msg: "Registration successful",
        token,
        userId: userExist._id.toString(),
      });
    } else {
      // If passwords do not match, return a 401 status with an error message
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }
  } catch (error) {
    // If any error occurs during the process, return a 500 status with a generic error message
    console.error("Error in login:", error);
    return res.status(500).json({ msg: "Internal server error in login" });
  }
};

module.exports = { home, register, login };
