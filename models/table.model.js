const mongoose = require("mongoose");


const Table = mongoose.model("Table", {
    id: Number,
    name: String,
  });
  
module.exports = Table;