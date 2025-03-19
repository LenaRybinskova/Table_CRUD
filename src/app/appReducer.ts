
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {

    status: 'idle',
}

export type initialStateType = typeof initialState;

const FETCH_DATA = 'FETCH_DATA'


export const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {
        case FETCH_DATA:
            return {...state,}
        default:
            return state
    }
}


export const fetchData = () => {
    return {
        type: FETCH_DATA,

    } as const
}

/*export type SetBook = ReturnType<typeof setBookAC>
export type SetAppStatus = ReturnType<typeof setAppStatusAC>
export type AppActions = SetBook | SetAppStatus*/

export const fetchDataTC = () => async () => {

}
