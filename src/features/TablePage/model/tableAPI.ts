import {instance} from '@/features/auth/model/authApi.ts';
import {BaseResponse} from '@/app/app.types.ts';
import {AxiosResponse} from 'axios';
import {Document} from '@/features/TablePage/model/tableAPI.types.ts';

export const tableAPI = {
    getTableData(token: string) {
        return instance.get<BaseResponse<Document>, AxiosResponse<BaseResponse<Document>>, string>('/ru/data/v3/testmethods/docs/userdocs/get', {
            headers: {
                'x-auth': token
            }
        });
    }
}