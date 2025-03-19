import {useAppDispatch, useAppSelector} from '@/app/store.ts';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchTableDataTC} from '@/features/TablePage/model/tableReducer.ts';
import {Document} from '@/features/TablePage/model/tableAPI.types.ts';
import {Card} from '@/common/components/Card/Card.tsx';


export const TablePage = () => {
    const token = useAppSelector(state => state.app.token)
    const documents = useAppSelector<Document[]>(state => state.table.data)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    if (!token) {
        navigate('')
    }

    useEffect(() => {
        dispatch(fetchTableDataTC(token))
    }, []);



    return (
        <div>
            {documents?.map(document => (<Card document={document} key={document.id}/>))}
        </div>
    )
}