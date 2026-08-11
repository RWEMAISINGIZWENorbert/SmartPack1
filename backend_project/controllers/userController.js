import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/generateAccessToken.js";

export const register = async (req, res) => {
    try {
        const { email,  password, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                msg: "Please provide the required credentials",
                error: true
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                msg: "The password those not match",
                error: true
            })
        }

        const isExist = await userModel.findOne({ where: { email } });

        if (isExist) {
            return res.status(409).json({
                msg: `The user with email ${email} already exists`,
                error: true,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const payload = {
            email,
            password: hashedPassword
        }

        const newUser = await userModel.create(payload);
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: "Please provide the required credentials",
                error: true
            });
        }

        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                msg: `The user with email ${email} does not exist`,
                error: true,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                msg: "Invalid password",
                error: true,
            });
        }

        const accessToken = await generateAccessToken(user.id);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            // maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ 
            success: true,
            data: user,
            accessToken: accessToken
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}