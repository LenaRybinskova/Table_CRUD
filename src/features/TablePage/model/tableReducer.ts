import {tableAPI} from '@/features/TablePage/model/tableAPI.ts';
import {Document, UpdateDate} from '@/features/TablePage/model/tableAPI.types.ts';
import {AppRootStateType} from '@/app/store.ts';

const initialState = {
    data: [] as Document[],
}

export type initialStateType = typeof initialState;

const FETCH_TABLE_DATA = 'FETCH_TABLE_DATA'
const DELETE_DOCUMENT = 'DELETE_DOCUMENT'
const ADD_DOCUMENT = 'ADD_DOCUMENT'
const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT'

export const tableReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {
        case FETCH_TABLE_DATA:
            return {...state, data: action.payload}
        case ADD_DOCUMENT:
            return {...state, data: [...state.data, action.payload]}
        case UPDATE_DOCUMENT:
            return {
                ...state,
                data: [...state.data.map(document => document.id === action.payload.id ? {...action.payload} : document)]
            }
        case DELETE_DOCUMENT:
            const newState={...state, data: state.data.filter(doc => doc.id !== action.payload)}
            return newState
        default:
            return state
    }
}

// TODO протипизировать норм
export const setDocumetsAC = (data: Document[]) => {
    return {
        type: FETCH_TABLE_DATA,
        payload: data
    } as const
}

export const addDocumentAC = (data: Document) => {
    return {
        type: ADD_DOCUMENT,
        payload: data
    } as const
}
export const deleteDocumentAC = (id: string) => {
    return {
        type: DELETE_DOCUMENT,
        payload: id
    } as const
}

export const updateDocumentAC = (document: Document) => {
    return {
        type: UPDATE_DOCUMENT,
        payload: document
    } as const
}

export type SetTableData = ReturnType<typeof setDocumetsAC>
export type AddDocument = ReturnType<typeof addDocumentAC>
export type DeleteDocument = ReturnType<typeof deleteDocumentAC>
export type UpdateDocument = ReturnType<typeof updateDocumentAC>
export type tableActions = SetTableData | AddDocument | DeleteDocument | UpdateDocument


export const fetchTableDataTC = (token: string) => async (dispatch: any) => {
    return tableAPI.getTableData(token)
        .then(res => {
            if (res.data.error_code === 0) {
                if(res.data.data){
                    dispatch(setDocumetsAC(res.data.data))
                }
            }
        })
}

export const deleteDocumentTC = (id: string, token: string) => async (dispatch: any) => {
    return tableAPI.deleteDocument(id, token)
        .then(res => {
            if (res.data.error_code === 0) {
                dispatch(deleteDocumentAC(id))
            }
        })
}

export const createDocumentTC = (model: Omit<Document, 'id'>, token: string) => async (dispatch: any) => {
    return tableAPI.createDocument(model, token)
        .then(res => {
            if (res.data.error_code === 0) {
                if (res.data.data) {
                    dispatch(addDocumentAC(res.data.data))
                }
            }
        })
}

export const updateDocumentTC = (updateDate: UpdateDate) => async (dispatch: any, getState: () => AppRootStateType) => {
    const state = getState()
    const document = state.table.data.find(doc => doc.id === updateDate.id)

    if (document) {
        const updateModelDocument: Document = {
            id: document.id,
            documentStatus: document.documentStatus,
            employeeNumber: document.employeeNumber,
            documentType: document.documentType,
            documentName: document.documentName,
            companySignatureName: document.companySignatureName,
            employeeSignatureName: document.employeeSignatureName,
            employeeSigDate: document.employeeSigDate,
            companySigDate: document.companySigDate,
            [updateDate.nameTitle]: updateDate.newTitle
        }

        return tableAPI.updateDocument(updateModelDocument, updateDate.token)
            .then(res => {
                if (res.data.error_code === 0) {
                    dispatch(updateDocumentAC(res.data.data))
                }
            })
    }
}
