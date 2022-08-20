const mongoose = require('mongoose')

const con = mongoose.connect(
  'Your MongoDB URI Goes Here!!',
  { useNewUrlParser: true, useUnifiedTopology: true },
  async () => {
    try {
      console.log('Database Connected Successfuly !!')
    } catch (err) {
      console.log(err)
    }
  }
)

module.exports = con
