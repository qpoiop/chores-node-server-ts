import fs from "fs"
import url from "url"
import multer from "multer"

import { NODE_ENV } from "~/env"

let storage = multer.diskStorage({
    destination(req, file, done) {
        const dist = "./uploads"
        if (!fs.existsSync(dist)) fs.mkdirSync(dist)
        return done(null, dist)
    },
    filename(req, file, done) {
        done(null, file.originalname)
    },
})

if (NODE_ENV === "production") {
}

export default multer({ storage })
