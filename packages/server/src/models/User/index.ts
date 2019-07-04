import { Document, Schema, Model, model } from "mongoose";
import { ObjectID } from "mongodb";

import { UserType } from "./types";

ObjectID.prototype.valueOf = function() {
    return this.toString();
};

interface UserModel extends UserType, Document {}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});

const User: Model<UserModel> = model<UserModel>("User", UserSchema);

export default User;
