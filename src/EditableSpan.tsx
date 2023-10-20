import { TextField } from '@mui/material';
import React, { useState } from 'react';

export type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)
    }

    const onChangeTitleHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant='standard' value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
};
