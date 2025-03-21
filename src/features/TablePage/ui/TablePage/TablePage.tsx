import {useAppDispatch, useAppSelector} from '@/app/store.ts';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchTableDataTC} from '@/features/TablePage/model/tableReducer.ts';
import {Document} from '@/features/TablePage/model/tableAPI.types.ts';
import {Card} from '@/common/components/Card/Card.tsx';
import {AddDocumentFrom} from '@/features/TablePage/ui/AddDocument/AddDocumentForm.tsx';
import {Box, CircularProgress, Container, Typography} from '@mui/material';
import {appErrorAC, loginAC, logoutAC} from '@/app/appReducer.ts';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ButtonContainer} from '@/common/components/Button/ButtonContainer.tsx';


export const TablePage = () => {
    const documents = useAppSelector<Document[]>(state => state.table.data)
    const error = useAppSelector(state => state.app.error)
    const token = useAppSelector(state => state.app.token)
    const status = useAppSelector(state => state.app.status)


    const isLoading = status === 'loading'

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
        const tokenLS = localStorage.getItem('token');
        if (tokenLS) {
            dispatch(appErrorAC(''))
            dispatch(fetchTableDataTC())
            dispatch(loginAC({token: tokenLS}))
        } else {
            navigate('/')
        }
    }, [token]);


    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleLogout = () => {
        dispatch(logoutAC())
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }

    return (
        <>
            {isLoading ? (
                <CircularProgress/>
            ) : (
                <Container
                    style={{display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', padding: '30px',}}>
                    <Box>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            flex: '0 0 30%',
                            border: '2px solid black',
                            padding: '20px',
                            borderRadius: '10px'
                        }}>
                            <Typography variant="h6">
                                Создайте новый документ:
                            </Typography>
                            <AddDocumentFrom/>

                        </Box>
                        <ButtonContainer type="button" variant="contained" sx={{mt: 2}}
                                         onClick={handleLogout}>Выйти</ButtonContainer>
                    </Box>


                    <Box style={{
                        flex: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        border: '2px solid black',
                        padding: '20px',
                        borderRadius: '10px'
                    }}>
                        <Typography variant="h6" style={{marginBottom: '20px', fontWeight: 'bold'}}>
                            Список документов:
                        </Typography>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px',
                        }}>
                            {documents?.map((document) => (
                                <div key={document.id} style={{
                                    boxSizing: 'border-box',
                                }}>
                                    <Card document={document}/>
                                </div>
                            ))}
                        </div>
                    </Box>

                </Container>
            )}
        </>
    )
}
