import * as http from "http"
import { Send } from "@types/express-serve-static-core"
import { ResponseFormat } from "~/config/httpDefinitions"
import { User } from "~/model/user.model"

declare module "express-serve-static-core" {
    namespace Express {
        type SessionExpress = import("express-session").Session
        export interface Request extends http.IncomingMessage, Express.Request, Passport.Request {
            session: SessionExpress
            isAuthenticated(): boolean
            isUnauthenticated(): boolean
            login(user: User, done: (err: any) => void): void
            logout(done: (err: any) => void): void
            context?: {
                user?: User
            }
        }

        export interface Response<ResponseFormat> extends Express.Response {
            status(code: StatusCode): this
            json: Send<ResponseFormat, this>
        }
    }
}
