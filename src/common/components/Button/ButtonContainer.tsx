import React from 'react';
import {Button, ButtonProps} from '@mui/material';

export type ButtonContainerType = ButtonProps & {
    children: React.ReactNode;
};

export const ButtonContainer = (props: ButtonContainerType) => {
    const {children, sx, ...rest} = props;
    return (
        <Button variant="contained" sx={{mt: 2, ...sx}} {...rest}>{children}</Button>)
};
