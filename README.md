# Dog Food Проект в рамках курсах обучения Фронтенд разработки в СберУниверситете

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## API 

API предоставлен обучающей организацией

## Приоритеты 

[CRITICAL] - Необходимый функционал проекта или блокирующие его баги
[HIGH] - Второстепенный функционал проекта или баги, которые выявлены в его реализации
[MIDDLE] - Дополнительный функционал проекта и сопутствующие баги
[LOW] - Опциональный функционал и сопутствующие баги


## Основной функционал проекта

+ Регистрация на сайте. Страница регистрации «/signup». Форма реализована через Formik (валидация через yup). После успешного ответа сервера перенаправляем пользователя на страницу аутентификации.

+ Аутентификация на сайте. Страница аутентификации «/signin». Форма реализована через Formik (валидация через yup). После успешного ответа сохраняем токен в состояние Redux. Пользователь остается авторизованными до момента нажатия на кнопку "Выйти". 

+ Настроена синхронизация Redux с LocalStorage

+ Главная страница-заглушка «/» со ссылками на Каталог и Личный кабинет

+ Страница отображения списка товаров «/products». Если пользователь не авторизован, то перенаправляем его на страницу аутентификации. Если пользователь авторизован, то получаем данные с сервера и отрисовываем карточки товаров. Здесь также реализован механизм отображения компонента Loader, чтобы информировать пользователя о сетевом запросе.

+ Реализован поиск товаров на главной странице с оптимизацией через debounce.

+ Реализована страница "Корзина": 
  1) Добавление товара в корзину происходит путем клика на кнопку "В корзину" в карточке товара на странице списка
  2) Количество товаров в корзине отображается рядом с иконкой в шапке сайта. Эта цифра отвечает за уникальные товары в корзине.
  3) В корзине отображается каждый товар на своей строчке (название товара, фото товара, количество, цена). За образец взяли реализацию корзины в сетевом магазине DNS.
  4) Реализован функционал изменения количества конкретного товара. Минимум 1 шт, максимум берем из поля "stock" у товара. При достижении границ, кнопки убавления/прибавления становятся неактивными.
  5) Реализована возможность удалить выбранный товар из корзины.
  6) Реализована возможность выбора товаров в корзине, которые пользователь будет оформлять. Логика такая, что в корзине могут находится десятки товаров, но пользователь может выбрать, например, только 2 товара, которые хочет оформить. 
  7) Реализован подсчет стоимости выбранных товаров (с учетом скидок) и выводим кнопку-пустышку "Оформить".
  8) Реализована информационная заглушка на детальной корзины, если в корзине нет товаров. "Здесь пока ничего нет" и ссылки на страницы Каталог, Личный кабинет.
  9) Добавлено модальное окно с подтверждением удаления товара из корзины

+ Реализована Детальная страница товара
  1) Загружаем информацию о товаре через TanStack. Id товара достаем через useParams
  2) Реализована возможность добавить товар в корзину.
  3) Реализовано отображение комментариев с получением имени автора по id


## План развития проекта

- [CRITICAL] 1) Детальная страница товара
- [CRITICAL]     1.2) Возможность добавить товар в избранное. Для этого создаем отдельный slice в редаксе.
- [CRITICAL]     1.5) Добавление комментариев (форма создания нового комментария располагается над комментариями)
- [CRITICAL]     1.6) Редактирование товара (Форма через Formik. Валидация через yup. Запрос через мутации TanStack)
            Кнопка редактирования есть только у товара, который вы добавили
- [CRITICAL]     1.7) Удаление товара. Кнопка удаления есть только у товара, который вы добавили

- [CRITICAL] 2) Добавление нового товара (через модалку/отдельная страница). Форма через Formik. Валидация через yup. Запрос через мутации TanStack

- [CRITICAL] 3) Реализация страницы избранных товаров. Отдельная страница.
При переходе на данную страницу подтягиваем id избранных товаров из redux'a, отправляем запрос на получение товаров по указанным id-шникам.

- [CRITICAL] 4) Сортировка товаров на странице '/products'. Параметры сортировки сохранять в url (По цене, по акции, по дате добавления)

- [CRITICAL] 5) Страница с информацией о пользователе (имя, должность, фото, группа, email)

### Опциональные изменения 
1. [MIDDLE] Переделать оставшиеся недоделанными кнопки в отдельные компоненты, которые используют модульный css. (кнопки В корзину, Подробнее, Войти, Зарегистрироваться)
2. [MIDDLE] Создать ещё папку "pages" и перекинуть в неё большие компоненты. Тогда в "common" будут атомы, а в "pages" большие страницы.
3. [MIDDLE] Реализовать синхронизацию с локальным хранилищем корзин для нескольких пользователей.
4. [LOW] Реализовать кнопку скрытия/показа пароля в инпутах форм.
5. [LOW] Добавить анимации переходов между страницами
6. [LOW] Добавить анимации кнопок при наведении на них указателя.
7. [LOW] Добавить возможность редактировать профиль пользователя в Личном кабинете. 

## Известные баги

- [LOW] Хедер не реагирует на изменение ширины вьюпорта. Предполагаемые шаги к устранению: завести состояние, чтобы Реакт реагировал на изменение ширины. 
- [LOW] Футер не реагирует на изменение ширины вьюпорта. Предполагаемые шаги к устранению: завести состояние, чтобы Реакт реагировал на изменение ширины. С учетом того, что у нас уже два компонента, которые этого требуют возможно правильнее использовать контекст для отслеживания ширины вьюпорта, а в компонентах только получать и использовать результат.
- [CRITICAL] После сохранения в локальном хранилище корзины одного пользователя, при входе на сайт с того же устройства другого пользователя может подгружаться корзина первого пользователя.
- [HIGH] Эффект моргания страницы при удалении продукта из корзины. Необходимо выставить keepPreviousData: true для сетевых запросов.
