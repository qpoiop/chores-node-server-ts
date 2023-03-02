import express from "express"
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import compression from "compression"
import morgan from "morgan"
import session from "express-session"
// import expressWs from "express-ws"
import lusca from "lusca"

import routes from "~/core/routes"
import passport from "passport"
import { stream } from "~/core/winston"

import { SECRET_KEY, RATE_LIMIT } from "./env"
import { ResponseFormat } from "./config/httpDefinitions"
import passportConfig from "./passport"

const app: express.Application = express()
// expressWs(app)

app.use(helmet())
app.use(cors({ credentials: true }))
app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 }))
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

app.use(lusca.xframe("SAMEORIGIN"))
app.use(lusca.xssProtection(true))

app.use("/", routes)

export default app
