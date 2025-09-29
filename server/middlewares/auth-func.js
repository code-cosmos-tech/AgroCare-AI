const jwt = require("jsonwebtoken");
const User = require("../db-models/user-model");

const authFunction = async (req, res, next) => {
    const data = req.header("Authorization");

    if(!data) {
        return res.status(401).json({msg: "Unauthorized. Access denied."});
    }
    try {
        const token = data.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT);
        const userData = await User.findOne({email: decoded.email}).select({password: 0});
        req.userData = userData;
        req.token = token;
        next();
    } catch (err) {
        const error = {
            status: 401,
            message: "Unauthorized. Access denied."
        }
        next(error);
    }
}

module.exports = authFunction;