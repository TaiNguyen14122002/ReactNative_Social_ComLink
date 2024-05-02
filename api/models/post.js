const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    image: [
        {
            type: String,
            require: true,
        }
    ],
    posttitle: {
        type: String,
        require: false,
    },
    liekpost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    commentpost:[
        {
            type: mongoose.Schema.Types.ObjectId,   //Lay du lieu nguoi comment
            ref: "User",
        },
        {
            type: String,  //Luu noi dung comment
            require: false,
        }
    ],
    sharepost:[
        {
            type: mongoose.Schema.Types.ObjectId,   //Lay du lieu nguoi chia se
            ref: "User",
        }
    ]
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post