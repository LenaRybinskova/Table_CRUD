export const validationRules = {
    username: {
        pattern: {
            message: 'Имя должно начинаться с user и далее укажите цифры',
            value: /^user\d+$/,
        },
    },
}