const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'username is required']
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'email is required'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    min: 6,
    select: false
  },
  avatar: {
    type: String,
    trim: true,
    default: "https://bhq.rupyeaze.space/img/862fa260b6c4159618ecca81b69f7ace.png"
  },
  firstName: {
    type: String,
    trim: true,
    default: ""
  },

  lastName: {
    type: String,
    trim: true,
    default: ""
  },
  description: {
    type: String,
    trim: true,
    default: ""
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getToken = function () {
  return jwt.sign({
    id:
      this._id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;