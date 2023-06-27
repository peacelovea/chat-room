const userModel = require("../models/userModels")
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const usernameCheck = await userModel.findOne({ username })
        if (usernameCheck) return res.json({ msg: "Username already used", status: false })
        const emailCheck = await userModel.findOne({ email })
        if (emailCheck) return res.json({ msg: "Email already used", status: false })

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