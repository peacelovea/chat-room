const userModel = require("../models/userModels")
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const usernameCheck = await userModel.findOne({ username })
        if (usernameCheck) return res.json({ msg: "用户名已经被使用", status: false })
        const emailCheck = await userModel.findOne({ email })
        if (emailCheck) return res.json({ msg: "邮箱已经被使用", status: false })

        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({ email, username, password: hashedPassword })

        delete user['password']
        console.log(user, 'user');
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ username })
        if (!user) return res.json({ msg: "用户名或密码错误", status: false })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.json({ msg: "用户名或密码错误", status: false })
        delete user['password']
        console.log(user, 'user');
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        console.log(req, 'req');
        const userId = req.params.id
        const avatarImage = req.body.image

        const userData = await userModel.findByIdAndUpdate(userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            {
                new: true
            }
        )
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        })
    } catch (ex) {
        next(ex);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ])
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
}