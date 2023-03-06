import { NextFunction, Request, Response } from "express"
import passport from "passport"
import { ResponseFormat, ResponseStatus } from "~/config/httpDefinitions"
import { User } from "~/model/user.model"

const AuthMiddleware = (req: Request, res: Response<ResponseFormat>, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: Error, user: User, format: ResponseFormat) => {
        console.log("error: ", err)
        console.log("user:", user)
        console.log("format:", format)

        if (err && err instanceof Error) {
            return res.status(500).json({
                ...ResponseStatus.SERVERERROR,
                detailMessage: err.message,
            })
        }
        if (!user) {
            return res.status(200).json({
                ...ResponseStatus.UNAUTHORIZED,
            })
        }

        req.context = { ...req.context, user }

        next()
    })(req, res, next)
}

export default AuthMiddleware
