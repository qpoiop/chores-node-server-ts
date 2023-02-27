export interface ResponseFormat {
    code: string
    message: string
    detailMessage?: string
    data?: object | {}
}

export interface HttpStatus {
    OK: ResponseFormat
    UNAUTHORIZED: ResponseFormat
    INVALIDPARAMS: ResponseFormat
}

export const ResponseStatus: HttpStatus = {
    OK: {
        code: "0000",
        message: "success",
        data: {},
    },
    UNAUTHORIZED: {
        code: "9999",
        message: "unauthorize token",
        detailMessage: "",
        data: {},
    },
    INVALIDPARAMS: {
        code: "9999",
        message: "invalid params",
        detailMessage: "",
        data: {},
    },
}
