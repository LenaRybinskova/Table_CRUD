import { Dispatch } from "redux";
import { appErrorAC, appStatusAC } from '@/app/appReducer.ts';


export const handleServerAppError = (res: any, dispatch: Dispatch) => {
    dispatch(appErrorAC(res.data.error_text))
    dispatch(appStatusAC("failed"));
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appErrorAC(error.message))
    dispatch(appStatusAC('failed'))
}