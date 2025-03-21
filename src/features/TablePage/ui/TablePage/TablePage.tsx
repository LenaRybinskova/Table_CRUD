import {useAppDispatch, useAppSelector} from '@/app/store.ts';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchTableDataTC} from '@/features/TablePage/model/tableReducer.ts';
import {Document} from '@/features/TablePage/model/tableAPI.types.ts';
import {Card} from '@/common/components/Card/Card.tsx';
import {AddDocumentFrom} from '@/features/TablePage/ui/AddDocument/AddDocumentForm.tsx';
import {Box, CircularProgress, Typography} from '@mui/material';
import {loginAC} from '@/app/appReducer.ts';
import {styles} from './styles.ts'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const TablePage = () => {
    const documents = useAppSelector<Document[]>(state => state.table.data)
    const error = useAppSelector(state => state.app.error)
    const status = useAppSelector(state => state.app.status)


    const isLoading=status==="loading"

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
        const tokenLS = localStorage.getItem('token');
        if(tokenLS){
            dispatch(fetchTableDataTC(tokenLS))
            dispatch(loginAC({token:tokenLS}))
        }
        else{
            navigate('/')
        }
    }, []);


    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <>
            {isLoading ? (
                <CircularProgress sx={styles.circularProgress} />
            ) : (
                <Box sx={styles.container}>
                    <Box sx={styles.createDocumentBox}>
                        <Typography variant="h6" sx={styles.createDocumentTitle}>
                            Создайте новый документ:
                        </Typography>
                        <AddDocumentFrom />
                    </Box>

                    <Box sx={styles.documentListBox}>
                        <Typography variant="h6" sx={styles.documentListTitle}>
                            Список документов:
                        </Typography>

                        <Box sx={styles.gridBox}>
                            {documents?.map((document) => (
                                <Card document={document} key={document.id} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}
