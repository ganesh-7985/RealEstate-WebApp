import User from "../models/user.model.js"
import dotenv from 'dotenv'
dotenv.config()
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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            res.status(404).json("User Not Found,SignUp")
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            res.status(401).json("Wrong Credentials, Try Again")
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        res.cookie('token', token, { httpOnly: true }).status(200).json(validUser);
    } catch (error) {
        next(error)
    }
}

