import {Document, UpdateDate} from '@/features/TablePage/model/tableAPI.types.ts';
import { Paper, Stack, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '@/app/store.ts';
import {deleteDocumentTC, updateDocumentTC} from '@/features/TablePage/model/tableReducer.ts';
import {EditableSpan} from '@/common/components/EditSpan/EditSpan.tsx';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';


type Props = {
    document: Document
}

export const Card = (props: Props) => {
    const {id} = props.document
    const {document}= props

    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.app.token)
    const fields = Object.keys(document as Omit<Document, "id">) as Array<keyof Omit<Document, "id">>

    const handleDelete = () => {
        dispatch(deleteDocumentTC(id, token))
    }

    const editCardHandle = (newTitle: string, field: string) => {
        const updatedate: UpdateDate = {
            id: id,
            nameTitle: field,
            newTitle: newTitle,
            token: token
        }
        dispatch(updateDocumentTC(updatedate)).then()
    }


    return (
        <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, borderRadius: 2, position: "relative" }}>
            <Stack spacing={1} alignItems="flex-start">
                {fields.map((field, index) => (
                    <Typography
                        component="span"
                        key={`${document.id}${index}`}
                        variant="body1"
                        sx={{ display: "block", textAlign: "left" }}
                    >
                        <b>{field}:</b>
                        <EditableSpan title={document[field]} onChange={editCardHandle} field={field}/>
                    </Typography>
                ))}
            </Stack>
            <IconButton
                onClick={handleDelete}
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8
                }}
            >
                <Delete />
            </IconButton>
        </Paper>
    )
}