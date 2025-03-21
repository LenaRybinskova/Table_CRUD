import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {validationRules} from '@/features/auth/ui/validationRules.ts';
import {ButtonContainer} from '@/common/components/Button/ButtonContainer.tsx';
import {InputContainer} from '@/common/components/Input/InputContainer.tsx';
import {useAppDispatch, useAppSelector} from '@/app/store.ts';
import {appErrorAC, loginTC} from '@/app/appReducer.ts';
import {Stack} from '@mui/material';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import {shallowEqual} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';


type FormValue = {
    username: string,
    password: string
}

export const Auth = () => {
    const {handleSubmit, control, formState: {errors, isValid}} = useForm<FormValue>({mode: 'onBlur'});
    const error = useAppSelector(state => state.app.error, shallowEqual);


    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const onSubmit: SubmitHandler<FormValue> = (data: FormValue) => {
        dispatch(loginTC(data))
            .then(res => {
                if (res) {
                    localStorage.setItem('username', data.username)
                    localStorage.setItem('token', res)
                    navigate('/table-page')
                     dispatch(appErrorAC(""))
                }
            })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
            <Stack spacing={2}>
                <InputContainer
                    name="username"
                    control={control}
                    errorMessage={errors.username?.message}
                    rules={validationRules.username}
                    textPlaceholder="user55"
                    title="Имя пользователя"
                />

                <InputContainer
                    name="password"
                    control={control}
                    errorMessage={errors.password?.message}
                    title="Пароль"
                    textPlaceholder="password"
                    autoComplete="off"
                />

                <ButtonContainer type="submit" variant="contained" sx={{mt: 2}} disabled={!isValid}>
                    Sign in
                </ButtonContainer>
            </Stack>
        </form>
    );
}