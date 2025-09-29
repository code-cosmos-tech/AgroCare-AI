const User = require("../db-models/user-model");


const getUser = async (req, res, next) => {
    try {
        const userData = req.userData;
        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
}

const updateUser = async(req, res, next)=>{
    try {
        const {username, email, phone, password} = req.body;

        const userExist = await User.findOne({email: email}) || await User.findOne({phone: phone});

        if(!userExist) {
            return res.status(400).json({msg: "User does not exist."});
        }

        if (username) userExist.username = username;
        if (email) userExist.email = email;
        if (phone) userExist.phone = phone;
        if (password) userExist.password = password;

        const updatedUser = await userExist.save();

        res.status(200).json({
            msg: "Profile updated successfully!",
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                phone: updatedUser.phone,
            },
        });
    } catch (error) {
        next(error);
    }
}

const deleteUser = async(req, res, next)=>{
    try {
        const { email } = req.body;
        const deletedUser = await User.findOneAndDelete({ email: email });
        res.status(200).json({msg: "user deleted successfully."});
    } catch (error) {
        next(error);
    }
}
module.exports = {getUser, updateUser, deleteUser};