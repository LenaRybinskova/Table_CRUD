import {instance} from '@/features/auth/model/authApi.ts';
import {BaseResponse} from '@/app/app.types.ts';
import {AxiosResponse} from 'axios';
import {Document} from '@/features/TablePage/model/tableAPI.types.ts';

export const tableAPI = {
    getTableData() {
        return instance.get<BaseResponse<Document[]>, AxiosResponse<BaseResponse<Document[]>>, string>('/ru/data/v3/testmethods/docs/userdocs/get', );
    },
    deleteDocument(id: string) {
        return instance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,{}, );
    },
    createDocument(dataDocument: Omit<Document, 'id'>) {
        return instance.post<BaseResponse<Document>, AxiosResponse<BaseResponse<Document>>, Omit<Document, 'id'>>(`/ru/data/v3/testmethods/docs/userdocs/create`,  dataDocument);
    },

    updateDocument(document: Document) {
        return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${document.id}`,  document,);
    },
}
