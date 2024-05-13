const mongoose = require('mongoose');
const storySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    image:[
        {
            type: String,
            require: true,
        }
    ]
})
const Story = mongoose.model("Story", storySchema )
module.exports = Story