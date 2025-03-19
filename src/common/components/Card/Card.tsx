import {Document} from '@/features/TablePage/model/tableAPI.types.ts';
import {Button, Paper, Stack, Typography} from '@mui/material';

type Props = {
    document: Document
}

export const Card = (props: Props) => {
    const {documentType, employeeNumber, documentStatus} = props.document

    const handleDelete = () => {

    }

    return (
        <Paper elevation={3} sx={{padding: 2, maxWidth: 400, borderRadius: 2}}>
            <Stack spacing={1}>
                <Typography variant="body1"><strong>Номер документа:</strong> {employeeNumber}</Typography>
                <Typography variant="body1"><strong>Тип документа:</strong> {documentType}</Typography>
                <Typography variant="body1"><strong>Статус:</strong> {documentStatus}</Typography>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Удалить документ
                </Button>
            </Stack>
        </Paper>
    )
}