import {authAPI} from '@/features/auth/model/authApi.ts';
import {LoginData} from '@/app/app.types.ts';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    token: '',
    status: 'idle',
    error: null
}

export type initialStateType = typeof initialState;

const LOGIN = 'LOGIN'


export const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {
        case LOGIN:
            return {...state, token: action.payload.token};
        default:
            return state
    }
}


export const loginAC = (token: string) => {
    return {
        type: LOGIN,
        payload: token
    } as const
}

export type Login = ReturnType<typeof loginAC>
export type AppActions = Login


export const loginTC = (data: LoginData) => async (dispatch: any) => {
    return authAPI.login(data).then(res => {
        if (res.data.error_code === 0) {
            dispatch(loginAC(res.data.data.token))
        }
    })

}