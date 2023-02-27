import { Router } from "express"
import service from "./service"

// hello-world
const controller = (() => {
    const router = Router()

    router.get("/", (req, res) => {
        res.json({ data: { message: "hello-world!" }, message: "Data obtained." })
    })
    /**
     * POST /hello-world { data?: any }
     * @example http POST :3000/hello-world
     * @example http POST :3000/hello-world data=Express
     */
    router.post("/", (req, res) => {
        res.json({ data: service.sayHello(req.body.data) })
    })

    return router
})()

export default controller
