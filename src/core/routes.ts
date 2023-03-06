import { Router } from "express"

import user from "~/controller/user.controller"
import auth from "~/controller/auth.controller"
import AuthMiddleware from "~/middleware/auth.middleware"

const router = Router()

router.get("/", (req, res, next) => {
    res.send(`alive`)
})

router.use("/user", AuthMiddleware, user)
router.use("/auth", auth)

export default router
