import { Router } from "express"

import user from "~/controller/user.controller"
import auth from "~/controller/auth.controller"

const router = Router()

router.get("/", (req, res, next) => {
    res.send(`alive`)
})

router.use("/user", user)
router.use("/auth", auth)

export default router
