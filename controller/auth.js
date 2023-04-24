const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer.model");

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
      role: 'user'
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).json({ message: "User created successfully..!" });
    } else {
      return res.status(400).json({ message: "Something wrong!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.customerLogin = async (req, res) => {
  const { tableId, name, deviceId } = req.body;
  try {
    const findCustomer = await Customer.findOne({ deviceId });
    if (findCustomer) {
      res.status(200).json({ message: ".." });
    } else {
      const customer = new Customer({
        name,
        tableId,
        deviceId,
      });

      const savedCustomer = await customer.save();
      if (savedCustomer) {
        // res.status(201).json({ message: "customer saved successfully!" });
        // if (findCustomer) {
          console.log();
        const token = jwt.sign(
          { _id: savedCustomer._id, tableId: savedCustomer.tableId },
          process.env.JWT_SECRECT,
          { expiresIn: "4h" }
        );
        const { name, tableId } = savedCustomer;
        // console.log(name);
        res.cookie("token", token, { expiresIn: "4h" });
        res.status(200).json({
          token,
          user: {
            name,
            tableId,
            deviceId,
          },
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}