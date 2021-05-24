const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

// get total count of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the User model using the userSchema
const User = model('User', userSchema);

// export the model
module.exports = User;