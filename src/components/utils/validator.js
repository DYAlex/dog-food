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

export const addReviewFormValidationSchema = Yup.object({
  rating: Yup.number()
    .min(1, 'Должно быть не менее 1')
    .max(5, 'Должно быть не более 5')
    .required('Укажите рейтинг'),
  text: Yup.string()
    .min(3, 'Должно быть не менее 3 символов')
    .max(200, 'Должно быть не более 200 символов')
    .required(''),
})

export const addProductFormValidationSchema = Yup.object({
  name: Yup.string().required('Название продукта - обязательное поле'),
  price: Yup.number().required('Необходимо указать цену продукта'),
  description: Yup.string().required('Описание продукта - обязательное поле'),
  pictures: Yup.string(),
  wight: Yup.string(),
  discount: Yup.number(),
  stock: Yup.number(),
  available: Yup.boolean(),
})
