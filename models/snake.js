var mongoose = require("mongoose");

var SnakeSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String
    },
    color: {
        type: String,
    },
    content: {
        type: String,
        maxlength: 2000
    },
    stars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User"
    }]
}, {
    timestamps: true
});

mongoose.model("Snake", SnakeSchema);