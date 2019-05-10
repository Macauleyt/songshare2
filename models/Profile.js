const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    tpye: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  location: {
    type: String
  },
  artists: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  spotifyusername: {
    type: String
  },

  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    instagram: {
      type: String
    },
    spotify: {
      type: String
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
