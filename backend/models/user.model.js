const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'email is required'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },

  lastName: {
    type: String,
    trim: true,
    required: true
  },
  library: {
    toWatch: [{
      _id: false,
      movieID: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true,
        trim: true
      }
    }],
    favourites: [{
      _id: false,
      movieID: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true,
        trim: true
      }
    }],
    seen: [{
      _id: false,
      movieID: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true,
        trim: true
      },
      rate: {
        type: Number,
        min: 0,
        max: 5
      }
    }]

  }



}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;