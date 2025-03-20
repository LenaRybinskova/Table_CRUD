import {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';
import {canBeEdited} from '@/common/utils/canBeEdited.ts';


type Props = {
    title: string
    onChange: (newTitle: string, field: string) => void
    field: string
};

export const EditableSpan = (props: Props) => {
    const {title, onChange, field } = props
    const [edit, setEdit] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(props.title)


    const editModeHandler = () => {
        setEdit(!edit)
        if (edit) {
            onChange(updateTitle, field)
        }
    }


    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    return edit && canBeEdited(field)
        ? (<TextField value={updateTitle} onChange={changeTitleHandler} autoFocus onBlur={editModeHandler}/>)
        : (<span style={{cursor: 'pointer'}} onDoubleClick={editModeHandler}>{title}</span>)
};

