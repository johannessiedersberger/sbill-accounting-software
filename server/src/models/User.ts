import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IUser {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    isValid: boolean,
    uniqueString: string,
    admin: boolean,
    date: Date
}

// Create Schema
var userSchema = new Schema<IUser>({
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

const User = mongoose.model<IUser>("User", userSchema);
export default User;