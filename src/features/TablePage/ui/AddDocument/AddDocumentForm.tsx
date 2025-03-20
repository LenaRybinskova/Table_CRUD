import {SubmitHandler, useForm} from 'react-hook-form';
import {InputContainer} from '@/common/components/Input/InputContainer.tsx';
import {ButtonContainer} from '@/common/components/Button/ButtonContainer.tsx';
import {generateData} from '@/common/utils/generateData.ts';
import {useAppDispatch, useAppSelector} from '@/app/store.ts';
import {createDocumentTC} from '@/features/TablePage/model/tableReducer.ts';
import {Document} from '@/features/TablePage/model/tableAPI.types.ts';


type FormValue = {
    companySignatureName: string,
    documentName: string
    documentStatus: string
    documentType: string
    employeeNumber: string
    employeeSignatureName: string
}


export const AddDocumentFrom = () => {

    const {handleSubmit, control, formState: {errors, isValid}} = useForm<FormValue>({mode: 'onBlur'});
    const token = useAppSelector(state => state.app.token)
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<FormValue> = (data: FormValue) => {

        const modelDocument: Omit<Document, 'id'> = {
            documentStatus: data.documentStatus,
            employeeNumber: data.employeeNumber,
            documentType: data.documentType,
            documentName: data.documentName,
            companySignatureName: data.companySignatureName,
            employeeSignatureName: data.employeeSignatureName,
            employeeSigDate: generateData(),
            companySigDate: generateData(),
        }
        dispatch(createDocumentTC(modelDocument, token))

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer
                name="companySignatureName"
                control={control}
                errorMessage={errors.companySignatureName?.message}
                textPlaceholder="Договор.sig"
                title="название компании"
            />

            <InputContainer
                name="documentName"
                control={control}
                errorMessage={errors.documentName?.message}
                textPlaceholder="document name"
                title="Имя документа"
            />

            <InputContainer
                name="documentStatus"
                control={control}
                errorMessage={errors.documentStatus?.message}
                textPlaceholder="document status"
                title="статус документа"
            />

            <InputContainer
                name="documentType"
                control={control}
                errorMessage={errors.documentType?.message}
                textPlaceholder="documentType"
                title="тип документа"
            />

            <InputContainer
                name="employeeNumber"
                control={control}
                errorMessage={errors.employeeNumber?.message}
                textPlaceholder="employee Number"
                title="номер сотрудника"
            />

            <InputContainer
                name="employeeSignatureName"
                control={control}
                errorMessage={errors.employeeSignatureName?.message}
                textPlaceholder="employee Signature Name "
                title="имя сотрудника"
            />

            <ButtonContainer type="submit" variant="contained" sx={{mt: 2}} disabled={!isValid}>
                Отправить
            </ButtonContainer>
        </form>
    );
}