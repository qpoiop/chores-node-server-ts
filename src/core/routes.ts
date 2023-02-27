import { Router } from "express"

import helloWorld from "~/functions/hello-world"
import authentication from "~/functions/auth"
import user from "~/functions/user"

const router = Router()

router.get("/", (req, res, next) => {
    res.send(`alive`)
})

router.use("/hello-world", helloWorld)
router.use("/auth", authentication)
router.use("/user", user)

export default router
