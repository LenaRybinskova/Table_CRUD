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
import {containerStyle, documentTitleStyle, gridStyle, leftBoxStyle, rightBoxStyle} from '@/features/TablePage/ui/TablePage/styles.ts';


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
                <Container sx={containerStyle}>
                    <Box>
                        <Box sx={leftBoxStyle}>
                            <Typography variant="h6">
                                Создайте новый документ:
                            </Typography>
                            <AddDocumentFrom />
                        </Box>
                        <ButtonContainer type="button" onClick={handleLogout}>
                            Выйти
                        </ButtonContainer>
                    </Box>

                    <Box sx={rightBoxStyle}>
                        <Typography variant="h6" sx={documentTitleStyle}>
                            Список документов:
                        </Typography>

                        <div style={gridStyle}>
                            {documents?.map((document) => (
                                <div key={document.id} style={{ boxSizing: 'border-box' }}>
                                    <Card document={document} />
                                </div>
                            ))}
                        </div>
                    </Box>
                </Container>
            )}
        </>
    )
}
