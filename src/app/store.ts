import {configureStore, ThunkDispatch} from '@reduxjs/toolkit'
import {AppActions, appReducer} from '@/app/appReducer.ts';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {tableActions, tableReducer} from '@/features/TablePage/model/tableReducer.ts';


export const store = configureStore({
    reducer: {
        app: appReducer,
        table:tableReducer
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppRootActions = AppActions | tableActions

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AppRootActions>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store