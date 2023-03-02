import { NextFunction, Request, Response, Router } from "express"
import { ResponseFormat, ResponseStatus } from "~/config/httpDefinitions"
import { User } from "~/model/user.model"
import userService from "~/service/user.service"
import authService from "~/service/auth.service"
import passport from "~/core/passport"
import { genJwtToken } from "~/config/utils"

// @controller(auth)
const controller = (() => {
    const router = Router()
    /**
     * @name signup - 회원가입
     * @return {Object<{ data: User, message: string }>}
     * @example POST /signup { User }
     */
    router.post("/signup", async (req: Request, res: Response<ResponseFormat>): Promise<void> => {
        const { e_id, e_pw, e_name, e_email, e_department } = req.body
        try {
            const user: User = await userService.createUser({
                e_id,
                e_pw,
                e_systemid: "test", //TODO: generate systemId,
                e_name,
                e_email,
                e_department,
            })
            res.status(200).json({
                ...ResponseStatus.OK,
                data: {
                    user,
                },
            })
        } catch (error) {
            res.status(200).json({
                ...ResponseStatus.INVALIDPARAMS,
            })
        }
    })

    /**
     * @name signin - 로그인
     * @return {Object<{ data: User, message: string }>}
     * @example POST /signin { e_id: ${e_id}, e_pw: ${e_pw} }
     */
    router.post("/signin", async (req: Request, res: Response<ResponseFormat>, next: NextFunction): Promise<void> => {
        // TODO: add auth login
        passport.authenticate("jwt", { session: false }, async (error: Error) => {
            try {
                const { e_id, e_pw } = req.body
                const user = await authService.signin({ e_id, e_pw })

                if (error) {
                    res.status(200).json({
                        ...ResponseStatus.SERVERERROR,
                    })
                    return
                }

                const payload = {
                    e_id,
                    e_systemid: user.e_systemid,
                    expires: Date.now() + 3 * 60 * 60 * 1000,
                }

                // TODO: accessToken
                const accessToken = genJwtToken(payload)
                // TODO: refreshToken
                const refreshToken = ""

                res.json({
                    ...ResponseStatus.OK,
                    data: {
                        ...user,
                        accessToken,
                        refreshToken,
                    },
                })
            } catch (error) {
                next(error)
            }
        })(req, res)
    })

    /** 로그아웃
     * @return {Object<{ data: User, message: string }>}
     */
    router.delete("/logout", (req: Request, res: Response<ResponseFormat>): void => {
        req.session.destroy(err => {})
        req.logout(err => {
            res.status(200).json({
                ...ResponseStatus.OK,
            })
        })
    })

    /** token 토큰 체크 미들웨어
     * @return {Object<{ data: User, message: string }>}
     */
    router.post("/token-check", (req: Request, res: Response<ResponseFormat>): void => {
        passport.authenticate("jwt", (error: Error, user: User, info: { name: string; message: string }) => {
            console.log(error, user, info)
            if (error && error instanceof Error) {
                if (error.message === "NOTEXISTDATA") {
                    res.status(200).json({
                        ...ResponseStatus.NOTFOUND,
                        detailMessage: info.message,
                    })
                    return
                } else {
                    res.status(500).json({
                        ...ResponseStatus.SERVERERROR,
                    })
                    return
                }
            }
            if (user) {
                req.context = { ...req.context, user }
            }

            res.status(200).json({
                ...ResponseStatus.OK,
                data: {
                    user,
                },
            })
            // TODO: change to middleware for auth route
            // next()
        })(req, res)
    })

    return router
})()

export default controller
