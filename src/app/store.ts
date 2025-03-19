import {configureStore, ThunkDispatch} from '@reduxjs/toolkit'

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppActions, appReducer} from '@/app/appReducer.ts';



export const store = configureStore({
    reducer: {
        app: appReducer,
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActions = AppActions

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AppRootActions>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store