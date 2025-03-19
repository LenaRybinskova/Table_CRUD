import {instance} from '@/features/auth/model/authApi.ts';

export const tableAPI = {
    getTableData(token: string) {
        return instance.get('/ru/data/v3/testmethods/docs/login', {
            headers: {
                'x-auth': token
            }
        });
    }
}