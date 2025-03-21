import {useAppDispatch, useAppSelector} from '@/app/store.ts';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchTableDataTC} from '@/features/TablePage/model/tableReducer.ts';
import {Document} from '@/features/TablePage/model/tableAPI.types.ts';
import {Card} from '@/common/components/Card/Card.tsx';
import {AddDocumentFrom} from '@/features/TablePage/ui/AddDocument/AddDocumentForm.tsx';
import {Box, CircularProgress, Typography} from '@mui/material';
import {appErrorAC, loginAC, logoutAC} from '@/app/appReducer.ts';
import {styles} from './styles.ts'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ButtonContainer} from '@/common/components/Button/ButtonContainer.tsx';


export const TablePage = () => {
    const documents = useAppSelector<Document[]>(state => state.table.data)
    const error = useAppSelector(state => state.app.error)
    const token = useAppSelector(state => state.app.token)
    const status = useAppSelector(state => state.app.status)


    const isLoading=status==="loading"

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
        const tokenLS = localStorage.getItem('token');
        if(tokenLS){
            dispatch(appErrorAC(""))
            dispatch(fetchTableDataTC())
            dispatch(loginAC({token:tokenLS}))
        }
        else{
            navigate('/')
        }
    }, [token]);


    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleLogout=()=>{
        dispatch(logoutAC())
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }

    return (
        <>
            {isLoading ? (
                <CircularProgress sx={styles.circularProgress} />
            ) : (
                <Box sx={styles.container}>
                    <Box sx={styles.createDocumentBox}>
                        <ButtonContainer type="button" variant="contained" sx={{mt: 2}} onClick={handleLogout}>Выйти</ButtonContainer>
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
