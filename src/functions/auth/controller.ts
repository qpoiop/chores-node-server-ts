import { Router } from "express"
import passport from "passport"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import otp from 'otplib';
import { SECRET_KEY } from "~/env"
import { UserModel } from "./model"
import service from "./service"

// auth
const controller = (() => {
    const router = Router()

    router.post("/token", passport.authenticate("jwt"), async (req, res) => {
        // res.json({ user: req.user })
    })

    router.post("/revoke", async (req, res) => {
        res.json({})
    })

    return router
})()

export default controller
