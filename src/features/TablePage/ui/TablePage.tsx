import {useAppSelector} from '@/app/store.ts';
import {useNavigate} from 'react-router-dom';

export const TablePage = ()=>{
    const token=useAppSelector(state => state.app.token)
    const navigate = useNavigate();

    if(!token){
        navigate('')
    }

    return <div>TablePage</div>
}