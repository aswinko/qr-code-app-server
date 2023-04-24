const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["billingUser", "kitchenUser", "admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.virtual('password')
// .set(function(password) {
//     this.passwordHash = bcrypt.hashSync(password, 10)
// })

userSchema.methods = {
    authenticate: async function(password) {
        return await bcrypt.compare(password, this.passwordHash);
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;
