export type BaseResponse<T> = {
    error_code: number
    profiling: string
    data?:T
    error_message: string
    timings: null
}

export type Token={ token: string }

export type LoginData = {
    username: string
    password: string
}