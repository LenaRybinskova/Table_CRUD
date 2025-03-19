import {tableAPI} from '@/features/TablePage/model/tableAPI.ts';
import {Document} from '@/features/TablePage/model/tableAPI.types.ts';

const initialState = {
    data:[] as Document[],
}

export type initialStateType = typeof initialState;

const FETCH_TABLE_DATA = 'FETCH_TABLE_DATA'

export const tableReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {
        case FETCH_TABLE_DATA:
            return {...state,data:action.payload}
        default:
            return state
    }
}

// TODO протипизировать норм
export const setTableDataAC = (data: any) => {
    return {
        type: FETCH_TABLE_DATA,
        payload: data
    } as const
}

export type SetTableData = ReturnType<typeof setTableDataAC>
export type tableActions = SetTableData


export const fetchTableDataTC = (token: string) => async (dispatch: any) => {
    return tableAPI.getTableData(token)
        .then(res => {
        if (res.data.error_code === 0) {
            const tableData = res.data.data
            console.log('fetchTableDataTC res.data.data:', res.data.data)
            dispatch(setTableDataAC(tableData))
        }
    })
}


/*data: {...state.data, ...Object.fromEntries(action.payload.map((item:Table) => [item.id, item]))*/
/*{} as Record<string, Table>*/