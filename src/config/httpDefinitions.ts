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
    NOTFOUND: ResponseFormat
    SERVERERROR: ResponseFormat
}

export const HttpCode = {
    OK: 200,
    UNAUTHORIZED: 403,
    INVALIDPARAMS: 400,
    NOTFOUND: 404,
    INTERNALSERVER: 500,
}

export const ResponseStatus: HttpStatus = {
    OK: {
        code: "0000",
        message: "success",
        data: {},
    },
    UNAUTHORIZED: {
        code: "9999",
        message: "unauthorized",
        detailMessage: "인증된 사용자가 아닙니다",
        data: {},
    },
    INVALIDPARAMS: {
        code: "9999",
        message: "invalid params",
        detailMessage: "입력값이 유효하지 않습니다",
        data: {},
    },
    NOTFOUND: {
        code: "9999",
        message: "not found",
        detailMessage: "데이터를 찾을 수 없습니다.",
        data: {},
    },
    SERVERERROR: {
        code: "0000",
        message: "server error",
        detailMessage: "서버 에러",
        data: {},
    },
}
