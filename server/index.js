const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const app = express();
const port = '3000';
const db = "mongodb+srv://threetest:KVpIFHyPFwGnOxPo@cluster0.ovt5v.mongodb.net/threetestdb?retryWrites=true&w=majority";

const userPositionSchema = new Schema({
  user: String,
  position: {
    type: {
      x: Number,
      y: Number,
      z: Number
    },
    required: true
  },
});
const UserPosition = mongoose.model('UserPosition', userPositionSchema);


app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => console.log('connected'))
  .catch(err => console.wran('error'))

app.get('/:user', (req, res) => {
  const user = req.params.user;

  UserPosition.findOne({ user })
    .then((user) => res.send(user))
    .catch(error => console.warn(error));
});

app.post('/', (req, res) => {
  const { user, position } = req.body;

  UserPosition.findOneAndUpdate({ user: user }, { position: position }, { upsert: true })
    .catch(error => console.warn(error));
});

app.listen(port, () => {
  console.log(`Test app listening on port ${port}`)
});



