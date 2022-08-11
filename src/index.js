const express = require('express')
const mongoose = require('mongoose');

const app = express()
const cors = require('cors')
const api = require('./routes/api');

require('dotenv').config()

const mongo_uri = process.env['MONGO_URI'];

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use("/api", api)


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
