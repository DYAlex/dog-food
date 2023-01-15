import * as Yup from 'yup'

export const signUpFormValidationSchema = Yup.object({
  email: Yup.string().email('Некорректный адрес электронной почты').required('Обязательное поле'),
  group: Yup.string().oneOf(['sm9'], 'Некорректная группа').required('Обязательное поле'),
  password: Yup.string()
    .min(8, 'Должно быть не менее 8 символов')
    .max(20, 'Должно быть не более 20-ти символов')
    .required('Обязательное поле'),
})
