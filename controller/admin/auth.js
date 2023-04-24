const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

exports.add = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ errorMessage: "Please enter all fields!" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ errorMessage: "Username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      passwordHash,
      role: "admin",
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).json({ message: "Admin created successfully..!" });
    } else {
      return res.status(400).json({ message: "Something wrong!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //validate
    if (!username || !password) {
      return res.status(400).json({ errorMessage: "please enter all fields!" });
    }

    const user = await User.findOne({ username });
    if (user) {
      if (user.authenticate(password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRECT,
          { expiresIn: "1d" }
        );

        const { username, role } = user;

        res.cookie('token', token, {expiresIn: '1d'});

        res.status(200).json({
          token,
          user: {
            username,
            role,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid password!",
        });
      }
    } else {
      return res
        .status(401)
        .json({ errorMessage: "Wrong username or password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({
      message: 'Logout successfully...!'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}