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

    /**
     * @name register - Register an account
     * @return {Object<{ username: string, message: string }>}
     *
     * @example POST /authentication/register { username: ${username}, password: ${password} }
     */
    router.post("/register", async (req, res) => {
        const { username, password, email } = req.body
        try {
            const passwordHash = await bcrypt.hash(password, 10)
            const user = new UserModel({ username, password: passwordHash, email })
            await user.save()
            res.status(200).json({ username, message: "Sign up suceesfully" })
        } catch (error) {
            res.status(400).json({ error })
        }
    })

    /**
     * @name login
     * @return {Object<{ username: string, token: string, message: string }>}
     */
    router.post("/login", async (req, res) => {
        const { userId, password } = req.body
        try {
            const user = await UserModel.findOne({ username }).exec()
            const passwordsMatch = await bcrypt.compare(password, user.password)
            if (passwordsMatch) {
                const payload = {
                    username: user.username,
                    // TODO: remove it
                    expires: Date.now() + 3 * 60 * 60 * 1000,
                }
                req.login(payload, { session: false }, async error => {
                    if (error) res.status(400).json({ message: error })
                    // TODO: expiresIn
                    const accessToken = jwt.sign(JSON.stringify(payload), SECRET_KEY, { expiresIn: "7d" })
                    // TODO: refreshToken
                    const refreshToken = service.generateRefreshToken(user, req.ip)
                    await refreshToken.save()
                    res.json({
                        username: user.username,
                        accessToken,
                        refreshToken,
                        message: "Sign in suceesfully",
                    })
                })
            } else {
                res.status(400).json({ message: "Incorrect Username / Password" })
            }
        } catch (error) {
            res.status(400).json({ message: error })
        }
    })

    router.post("/token", passport.authenticate("jwt"), async (req, res) => {
        // res.json({ user: req.user })
    })

    router.post("/revoke", async (req, res) => {
        res.json({})
    })

    return router
})()

export default controller
