import { NextFunction, Request, Response, Router } from "express"
import { ResponseFormat, ResponseStatus } from "~/config/httpDefinitions"
import { User } from "./model"
import service from "./service"

// @controller(user)
const controller = (() => {
    const router = Router()

    /**
     * @method GET
     * @route /user
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
     * @description 아이디로 유저 정보 조회
     * @auth optional
     * @method GET
     * @route /user
     * @param id string
     */
    router.get("/:id", async (req: Request, res: Response<ResponseFormat>, next: NextFunction) => {
        try {
            const { e_id } = req.body
            const user: User = await service.findUserById(e_id)
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

    /**
     * @description 유저 생성
     * @auth optional
     * @method POST
     * @route /user
     * @param user User
     */
    router.post("/create", async (req: Request, res: Response<ResponseFormat>, next: NextFunction) => {
        try {
            // const user: User = await service.createUser(req.params)
            res.status(200).json({
                ...ResponseStatus.OK,
                data: {
                    // user,
                },
            })
        } catch (error) {
            next(error)
        }
    })

    return router
})()

export default controller
