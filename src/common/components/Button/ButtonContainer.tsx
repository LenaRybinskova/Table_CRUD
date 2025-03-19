import React from 'react';
import {Button, ButtonProps} from '@mui/material';

export type ButtonContainerType = ButtonProps & {
    children: React.ReactNode;
};

export  const ButtonContainer = (props: ButtonContainerType) => {
    const {children, ...rest} = props;
    return <Button {...rest}>{children}</Button>;
};
