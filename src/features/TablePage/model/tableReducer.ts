import {tableAPI} from '@/features/TablePage/model/tableAPI.ts';
import {Document, UpdateDate} from '@/features/TablePage/model/tableAPI.types.ts';
import {AppRootStateType} from '@/app/store.ts';
import {AppError, appStatusAC, LOG_OUT, Logout} from '@/app/appReducer.ts';
import {handleServerAppError, handleServerNetworkError} from '@/common/utils/handleError.ts';

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
            return {...state,
                data: [...state.data.map(document => document.id === action.payload.id ? {...action.payload} : document)]}
        case DELETE_DOCUMENT:
            return {...state, data: state.data.filter(doc => doc.id !== action.payload)}
        case LOG_OUT:
            return initialState;
        default:
            return state
    }
}


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
export type tableActions = SetTableData | AddDocument | DeleteDocument | UpdateDocument | AppError | Logout


export const fetchTableDataTC = () => async (dispatch: any) => {
    dispatch(appStatusAC('loading'))
    return tableAPI.getTableData()
        .then(res => {
            if (res.data.error_code === 0) {
                if (res.data.data) {
                    dispatch(setDocumetsAC(res.data.data))
                    dispatch(appStatusAC('succeeded'))
                }
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const deleteDocumentTC = (id: string) => async (dispatch: any) => {
    dispatch(appStatusAC('loading'))
    return tableAPI.deleteDocument(id)
        .then(res => {
            if (res.data.error_code === 0) {
                dispatch(deleteDocumentAC(id))
                dispatch(appStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const createDocumentTC = (model: Omit<Document, 'id'>) => async (dispatch: any) => {
    dispatch(appStatusAC('loading'))
    return tableAPI.createDocument(model)
        .then(res => {
            if (res.data.error_code === 0) {
                if (res.data.data) {
                    dispatch(addDocumentAC(res.data.data))
                    dispatch(appStatusAC('succeeded'))
                }
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateDocumentTC = (updateDate: UpdateDate) => async (dispatch: any, getState: () => AppRootStateType) => {
    dispatch(appStatusAC('loading'))
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

        return tableAPI.updateDocument(updateModelDocument)
            .then(res => {
                if (res.data.error_code === 0) {
                    dispatch(updateDocumentAC(res.data.data))
                    dispatch(appStatusAC('succeeded'))
                } else {
                    handleServerAppError(res, dispatch)
                }
            }).catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
