import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
var userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    isValid: {
        type: Boolean,
        require: true
    },
    uniqueString: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);
export default User;