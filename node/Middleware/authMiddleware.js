
import JWT from "jsonwebtoken";
import userModel from "../Model/authModel.js";

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = await JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode
        next()
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(400).send({
                success: false,
                message: "Unauthorized Access"
            })
        }
        else (
            next()

        )
    } catch (error) {
        console.log(error)
    }
}