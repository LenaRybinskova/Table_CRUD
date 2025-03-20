import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {validationRules} from '@/features/auth/ui/validationRules.ts';
import {ButtonContainer} from '@/common/components/Button/ButtonContainer.tsx';
import {InputContainer} from '@/common/components/Input/InputContainer.tsx';
import {useAppDispatch} from '@/app/store.ts';
import {loginTC} from '@/app/appReducer.ts';


type FormValue = {
    username: string,
    password: string
}

//TODO интерсептор настроить
export const Auth = () => {
    const {handleSubmit, control, formState: {errors, isValid}} = useForm<FormValue>({mode: 'onBlur'});
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<FormValue> = (data: FormValue) => {
        dispatch(loginTC(data)).then(res => {
            if(res){
                localStorage.setItem('username', data.username)
                localStorage.setItem('token', res)
            }
            navigate('/table-page')
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer
                name="username"
                control={control}
                errorMessage={errors.username?.message}
                rules={validationRules.username}
                textPlaceholder="Введите имя"
                title="Имя пользователя"
            />

            <InputContainer
                name="password"
                control={control}
                errorMessage={errors.password?.message}
                textPlaceholder="Введите пароль"
                title="Пароль"
                type="password"
            />

            <ButtonContainer type="submit" variant="contained" sx={{mt: 2}} disabled={!isValid}>
                Отправить
            </ButtonContainer>
        </form>
    );
}