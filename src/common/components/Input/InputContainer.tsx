
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

export type InputContainerProps<T extends FieldValues> = TextFieldProps & {
    name: Path<T>;
    control: Control<T>;
    errorMessage?: string;
    rules?: object;
    textPlaceholder?: string;
    title?: string;
};

export const InputContainer = <T extends FieldValues>({name, control, errorMessage, rules = { required: 'Обязательное поле' }, textPlaceholder, title, ...rest}: InputContainerProps<T>) => {

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <TextField
                    {...field}
                    {...rest}
                    label={title}
                    placeholder={textPlaceholder}
                    error={!!errorMessage}
                    helperText={errorMessage || ""}
                    fullWidth
                />
            )}
        />
    );
};