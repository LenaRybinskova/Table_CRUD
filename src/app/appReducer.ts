import {authAPI} from '@/features/auth/model/authApi.ts';
import {LoginData, Token} from '@/app/app.types.ts';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    token: '',
    status: 'idle',
    error: "",
    isInitialized: false
}

export type initialStateType = typeof initialState;

const LOGIN = 'LOGIN'
const LOADING = 'LOADING'
const SET_ERROR = 'SET_ERROR'

export const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {
        case LOGIN:
            return {...state, token: action.payload.token};
        case LOADING:
            return {...state, status: action.payload};
        case SET_ERROR:
            return {...state, error: action.payload};
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

export type Login = ReturnType<typeof loginAC>
export type AppStatus = ReturnType<typeof appStatusAC>
export type AppError = ReturnType<typeof appErrorAC>
export type AppActions = Login | AppStatus | AppError


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
                if(res.data.error_text){
                    dispatch(appErrorAC(res.data.error_text))
                    dispatch(appStatusAC('failed'))
                }
            }
        })
        .catch((error) =>{
            dispatch(appErrorAC(error.message))
            dispatch(appStatusAC('failed'))
        })
}