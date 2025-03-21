# Table_documents
## В проекте использовались библиотеки:
- React
- React - Redux
- Regux - Thunk
- React - Router - Dom
- Axios
- React - hook - form
- React - toastify
- MUI
- Vite (инструмент сборки)

Со старта приложения Вы попадает на главную страницу c формо авторизации, все поля обязательны для заполнения.
После авторизации происходит редирект на страницу с имеющимися документами.
Слева форма для создания нового документа.
Справа отображаются имеющиеся документы.
![Image alt](https://github.com/LenaRybinskova/Table_CRUD/blob/main/1.bmp)

Документы можно удалять, редактировать ( двойной клик по тексту поля).
Защищенные от редактирования поля: id, employeeSigDate, companySigDate.
Добавлен обработчик ошибок и уведомления об ошибках.

![Image alt](https://github.com/LenaRybinskova/Table_CRUD/blob/main/2.bmp)
