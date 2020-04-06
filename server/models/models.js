const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Schema = mongoose.Schema;
const MONGO_URI = `mongodb+srv://${process.env.PASSWORD}@cluster0-donuw.mongodb.net/test?retryWrites=true&w=majority`;

console.log(process.env.PASSWORD);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "kondo",
  })
  .then(() => {
    console.log("connected to kondo database");
  })
  .catch((err) => {
    console.log(err);
  });

//sets a schema for the 'users'
const usersSchema = new Schema({
  username: String,
  password: String,
  //sites: ARRAY of Objects
});

const Users = mongoose.model("users", usersSchema);

//sets schema for 'sites"
const sitesSchema = new Schema({
  url: String,
  siteName: String,
  scripts: [String],
  runs: [{}],
  date: { type: Date, default: Date.now },
});

const Sites = mongoose.model("sites", sitesSchema);

module.exports = {
  Users,
  Sites,
};
