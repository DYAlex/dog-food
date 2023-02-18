import * as Yup from 'yup'

export const signUpFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Некорректный адрес электронной почты')
    .required('Не указан адрес электронной почты'),
  group: Yup.string().oneOf(['sm9'], 'Некорректная группа').required('Не указана группа'),
  password: Yup.string()
    .min(8, 'Должно быть не менее 8 символов')
    .max(20, 'Должно быть не более 20-ти символов')
    .required('Не заполнено обязательное поле "Пароль"'),
})

export const signInFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Некорректный адрес электронной почты')
    .required('Не указан адрес электронной почты'),
  password: Yup.string()
    .min(8, 'Должно быть не менее 8 символов')
    .max(20, 'Должно быть не более 20-ти символов')
    .required('Не заполнено обязательное поле "Пароль"'),
})
