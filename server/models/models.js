const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: __dirname + '/../../.env' })

const MONGO_URI = `mongodb+srv://${process.env.PASSWORD}@cluster0-donuw.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'kondo'
})
  .then(() => { console.log('connected to kondo database') })
  .catch((err) => { console.log(err) });