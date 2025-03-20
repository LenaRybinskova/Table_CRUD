export const canBeEdited = (field: string): boolean => {
    const disabledFields = ["id", "employeeSigDate", "companySigDate"];
    return !disabledFields.includes(field);
};