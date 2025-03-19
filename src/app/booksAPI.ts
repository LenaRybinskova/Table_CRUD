import axios from 'axios'
import {Book} from '@/app/booksAPI.types.ts';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
})


export const authApi = {
    getBooks() {
        return instance.get<Book[]>('posts?_limit=10').then(res =>res.data);
    }
}
