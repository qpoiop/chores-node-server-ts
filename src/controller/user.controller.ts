import { NextFunction, Request, Response, Router } from "express"
import { ResponseFormat, ResponseStatus } from "~/config/httpDefinitions"
import { User } from "~/model/user.model"
import userService from "~/service/user.service"

// @controller(user)
const controller = (() => {
    const router = Router()

    /**
     * @returns {{Object<{ResponseStatus.OK}>}}
     * @example /user
     */
    router.get("/", async (req: Request, res: Response<ResponseFormat>, next: NextFunction) => {
        try {
            res.status(200).json({
                ...ResponseStatus.OK,
            })
        } catch (error) {
            next(error)
        }
    })

    /**
     * @name /:id 아이디로 유저 정보 조회
     * @return {Object<{}>}
     * @example GET user/:id
     */
    router.get("/:id", async (req: Request, res: Response<ResponseFormat>, next: NextFunction) => {
        const { e_id } = req.body
        try {
            const user: User = await userService.findUserById(e_id)
            res.status(200).json({
                ...ResponseStatus.OK,
                data: {
                    user,
                },
            })
        } catch (error) {
            next(error)
        }
    })

    return router
})()

export default controller
