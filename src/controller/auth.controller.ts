import { NextFunction, Request, Response, Router } from "express"
import { ResponseFormat, ResponseStatus } from "~/config/httpDefinitions"
import { User } from "~/model/user.model"
import userService from "~/service/user.service"
import passport from "passport"
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
        passport.authenticate("local", (error: Error, user: User, format: ResponseFormat) => {
            try {
                // const { e_id, e_pw } = req.body
                // const user = await authService.signin({ e_id, e_pw })

                if (error && error instanceof Error) {
                    return res.status(500).json({
                        ...ResponseStatus.SERVERERROR,
                        detailMessage: error.message,
                    })
                }
                if (!user) {
                    return res.status(200).json(format)
                }

                const payload = {
                    e_id: user.e_id,
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
        passport.authenticate("jwt", (error: Error, user: User, format: ResponseFormat) => {})
        // TODO: JWT 세션 초기화
        req.session.destroy(err => {
            // res.clearCookie("session")
            res.status(200).json({
                ...ResponseStatus.OK,
            })
        })
    })

    return router
})()

export default controller
