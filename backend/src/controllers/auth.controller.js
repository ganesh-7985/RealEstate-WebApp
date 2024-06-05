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

export const google = async (req, res, next) => {
    try {
        const { email, name, photo } = req.body;
        if (!email || !name ) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email,
                password: hashedPassword,
                avatar: photo,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        console.error("Google sign-in error:", error); // Add logging for the error
        next(error);
    }
};


  export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };