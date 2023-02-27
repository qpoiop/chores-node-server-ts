import * as http from "http"
import { ResponseFormat } from "./httpTypes"
import { Send } from "@types/express-serve-static-core"
import { User } from "@prisma/client"

declare module "express-serve-static-core" {
    namespace Express {
        export interface RequestAuth extends http.IncomingMessage, Express.Request {
            context?: {
                user?: User
            }
        }

        export interface RequestBody<T> extends RequestAuth {
            body: T
        }

        export interface Response<ResponseFormat> extends Express.Response {
            status(code: StatusCode): this
            json: Send<ResponseFormat, this>
        }
    }
}
