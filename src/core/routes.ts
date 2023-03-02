import { Router } from "express"

import helloWorld from "~/functions/hello-world"
import user from "~/controller/user.controller"
import auth from "~/controller/auth.controller"

const router = Router()

router.get("/", (req, res, next) => {
    res.send(`alive`)
})

router.use("/hello-world", helloWorld)
router.use("/user", user)
router.use("/auth", auth)

export default router
