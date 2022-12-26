import mongoose, { ObjectId } from "mongoose";
const Schema = mongoose.Schema;

interface IToken {
    userId: ObjectId,
    token: string,
    createdAt: Date,
}

const tokenSchema = new Schema<IToken>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

const Token = mongoose.model<IToken>("Token", tokenSchema);
export default Token;