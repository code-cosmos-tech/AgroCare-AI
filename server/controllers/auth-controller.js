const User = require("../db-models/user-model");

const register = async (req, res, next) => {
    try {
        const {username, email, phone, password} = req.body;
        const userExist = await User.findOne({email: email}) || await User.findOne({phone: phone});

        if(userExist) {
            return res.status(409).json({msg: "User already exist."});
        }
        const userCreated = await User.create({username: username, email: email, phone: phone, password: password});
        res.status(201).json({msg: "Account created successfully.", token: await userCreated.generateToken()});

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email: email});

        if(!userExist) {
            return res.status(404).json({msg: "No such record exist."});
        }
        if(await userExist.comparePass(password)) {
            return res.status(200).json({msg: "Login successful.", token: await userExist.generateToken()});
        }
        res.status(401).json({msg: "Incorrect password or email."})
    } catch (error) {
        next(error);
    }
}

module.exports = {register, login};