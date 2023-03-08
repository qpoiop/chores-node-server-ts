import express from "express"
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import compression from "compression"
import morgan from "morgan"
import session from "express-session"
import lusca from "lusca"

import routes from "~/core/routes"
import passport from "passport"
import { stream } from "~/core/winston"

import { SECRET_KEY, RATE_LIMIT } from "./env"
import passportConfig from "./passport"
import ErrorMiddleware from "./middleware/error.middleware"

const app: express.Application = express()

app.use(helmet())
app.use(cors({ credentials: true }))
app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 })) // 루트 디렉터리에서 정의된 RATE_LIMIT 변수 사용
app.use(compression())
app.use(morgan("combined", { stream }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        secret: SECRET_KEY,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
        },
        resave: false,
        saveUninitialized: true,
    })
)
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

// 에러 케이스 핸들링
app.use(ErrorMiddleware)

app.use(lusca.xframe("SAMEORIGIN"))
app.use(lusca.xssProtection(true))

app.use("/", routes)

export default app
