import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signup = async (req, res, next) => {
    const { username, password, email } = req.body
    const hashedpassword = bcrypt.hashSync(password, 10)
    try {
        const newUser = await User.create({ username, password: hashedpassword, email });
        if (!newUser) {
            res.status(411).json("Error in creating User")
        }
        res.status(200).json({ msg: "User created successfully", newUser })
    } catch (error) {
        next(error)
    }
}

