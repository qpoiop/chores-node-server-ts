import { NextFunction, Request, Response } from "express"
import { ResponseFormat } from "~/config/httpDefinitions"

type ErrorResponse = Error & { data: ResponseFormat; status?: number }

const ErrorMiddleware = (err: ErrorResponse, req: Request, res: Response<ResponseFormat>, next: NextFunction) => {
    console.error(err.stack)

    const status = err.status || 500
    const message = err.message || ""

    res.status(status).json(err?.data || { error: message })
}

export default ErrorMiddleware
