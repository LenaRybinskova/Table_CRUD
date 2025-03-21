import {authAPI} from '@/features/auth/model/authApi.ts';
import {LoginData, Token} from '@/app/app.types.ts';
import {handleServerAppError, handleServerNetworkError} from '@/common/utils/handleError.ts';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    token: '',
    status: 'idle',
    error: '',
}

export type initialStateType = typeof initialState;

const LOGIN = 'LOGIN'
const LOADING = 'LOADING'
const SET_ERROR = 'SET_ERROR'
export const LOG_OUT = 'LOG_OUT'

export const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {
        case LOGIN:
            return {...state, token: action.payload.token};
        case LOADING:
            return {...state, status: action.payload};
        case SET_ERROR:
            return {...state, error: action.payload};
        case LOG_OUT:
            return initialState;
        default:
            return state
    }
}


export const loginAC = (token: Token) => {
    return {
        type: LOGIN,
        payload: token
    } as const
}

export const appStatusAC = (status: RequestStatus) => {
    return {
        type: LOADING,
        payload: status
    } as const
}

export const appErrorAC = (error: string) => {
    return {
        type: SET_ERROR,
        payload: error
    } as const
}

export const logoutAC = () => {
    return {
        type: LOG_OUT,
    } as const
}

export type Login = ReturnType<typeof loginAC>
export type AppStatus = ReturnType<typeof appStatusAC>
export type AppError = ReturnType<typeof appErrorAC>
export type Logout = ReturnType<typeof logoutAC>
export type AppActions = Login | AppStatus | AppError | Logout


export const loginTC = (data: LoginData) => async (dispatch: any) => {
    dispatch(appStatusAC('loading'))
    return authAPI.login(data)
        .then(res => {
            if (res.data.error_code === 0) {
                if (res.data?.data?.token) {
                    const token = res.data?.data?.token
                    dispatch(loginAC({token}))
                    dispatch(appStatusAC('succeeded'))
                    return token
                }
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}