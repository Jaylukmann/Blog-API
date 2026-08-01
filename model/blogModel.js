const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
      author: {
      type: String,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    tags: {
      type: [String],
      default: [],
    },
     status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    views: {
      type: Number,
      default: 0,
    },
   createdAt: {
    type: Date,
    default: Date.now
}  
});

module.exports = mongoose.model("BlogModel", blogSchema);