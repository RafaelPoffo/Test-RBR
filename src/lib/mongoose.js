require('dotenv').config();

const mongoose = require('mongoose');

function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    return mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.sitpkh9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  }
}

module.exports = { mongooseConnect };
