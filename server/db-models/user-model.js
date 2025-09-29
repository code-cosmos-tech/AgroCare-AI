const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    profilePic : {
        type : Buffer,
        require : false,
    }
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if(!this.isModified()) {
            next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.methods.comparePass = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error);
        return false;
    }
}

userSchema.methods.generateToken = function() {
    return jwt.sign({
            id: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT,
        {
            expiresIn: "1d",
        }
    )
}

const User = new model("User", userSchema);
module.exports = User;