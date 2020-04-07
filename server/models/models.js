const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Schema = mongoose.Schema;
const kondoURI = `mongodb+srv://${process.env.PASSWORD}@cluster0-donuw.mongodb.net/test?retryWrites=true&w=majority`;

const myURI = process.env.MONGO_URI || kondoURI;

mongoose
  .connect(myURI, {
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

/** FOR FUTURE USE, ONCE AUTHENTICATION MEASURES HAVE BEEN IMPLEMENTED */

// const usersSchema = new Schema({
//   username: String,
//   password: String,
//   //sites: ARRAY of Objects
// });

// const Users = mongoose.model("users", usersSchema);

/* SITES SCHEMA */
const sitesSchema = new Schema({
  url: String,
  siteName: String,
  scripts: [String],
  runs: [{ type: Schema.Types.ObjectId, ref: "Runs" }],
});

const Sites = mongoose.model("Sites", sitesSchema);

/* RUNS SCHEMA */
const runsSchema = new Schema({
  heapUsageOverTime: Object,
  memoryLeaks: Object,
});

const Runs = mongoose.model("Runs", runsSchema);

/* SCRIPTS SCHEMA -- NOT CURRENTLY IN USE */
const scriptsSchema = new Schema({
  name: String,
  script: String
});

const Scripts = mongoose.model("Scripts", scriptsSchema);

module.exports = { Sites, Runs, Scripts };
