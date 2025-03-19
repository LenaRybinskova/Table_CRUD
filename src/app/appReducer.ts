import {Book} from '@/app/booksAPI.types.ts';
import {authApi} from '@/app/booksAPI.ts';



export type BookApp = Book & {
    author: string
    price: number
    url:string
};
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    books: [] as BookApp[],
    status: 'idle',
}

export type initialStateType = typeof initialState;

const SET_BOOK = 'SET_BOOK'
const SET_APP_STATUS = 'SET_APP_STATUS'

export const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_BOOK:
            return {...state,}
        default:
            return state
    }
}
export const setBookAC = (data: Book[]) => {
    return {
        type: SET_BOOK,
        payload: data
    } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
    return {
        type: SET_APP_STATUS,
        payload: status
    } as const
}

export type SetBook = ReturnType<typeof setBookAC>
export type SetAppStatus = ReturnType<typeof setAppStatusAC>
export type AppActions = SetBook | SetAppStatus

export const fetchBooksData = () => async (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    return authApi.getBooks()
        .then(data => {
            dispatch(setBookAC(data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(() => {
            dispatch(setAppStatusAC('failed'))
                throw new Error('Failed to fetch info')
            }
        )
}
