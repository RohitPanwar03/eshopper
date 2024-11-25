import JWT from "jsonwebtoken"
import userModel from "../Model/authModel.js";
import { comparepassword, hashpassword } from '../helper/authhelper.js';

export const RegisterController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // VALIDATIONS
        if (!name) {
            return res.status(404).send({
                message: "Name is Required"
            })
        }
        if (!email) {
            return res.status(404).send({
                message: "Email is Required"
            })
        }
        if (!password) {
            return res.status(404).send({
                message: "Password is Required"
            })
        }
        if (!phone) {
            return res.status(404).send({
                message: "Phone is Required"
            })
        }
        if (!address) {
            return res.status(404).send({
                message: "Address is Required"
            })
        }

        // Check existing user
        const existinguser = await userModel.findOne({ email })

        if (existinguser) {
            return res.status(404).send({
                success: false,
                message: "User already exists",
            })
        }

        // hashpassword
        const hashpass = await hashpassword(password);

        // Save User
        const user = await new userModel({ name, email, phone, address, password: hashpass }).save()

        res.status(200).send({
            success: true,
            message: "User created Successfully",
            user
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // VALIDATIONS
        if (!email) {
            return res.send({
                message: "Email is required"
            })
        }
        if (!password) {
            return res.send({
                message: "Password is required"
            })
        }

        // Check User
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found Register first"
            })
        }

        // COMPARE PASSWORD

        const match = await comparepassword(password, user.password);

        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid Credentials"
            })
        }

        // TOKEN
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

// TEST CONTROLLER

export const testController = (req, res) => {
    res.send("Protected Route")
}