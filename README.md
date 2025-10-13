# Лабораторно-практична робота №5
## Розширення бекенд-додатку власними сутностями та реалізація REST API

## Діаграмма сутностей:
![Діаграмма](/img/діаграмма.png)
## Короткий опис реалізованих сутностей
### Students - ця сутність описує всіх студентів
### Rooms -  ця сутність описує всі кімнати
### Histories - це зв'язуюча сутність утворенна зв'язком ManyToMany, що описує проживання студента у кімнаті у певний проміжок часу.
### Опис зв'яку: Students зв'язок OneToMany до Histories та від Histories зв'язок ManyToOne до Rooms.
### Students

POST /v1/students — створення запису

GET /v1/students — отримання всіх записів

GET /v1/students/:id — отримання запису за певним ID

PATCH /v1/students/:id — модифікування запису

DELETE /v1/students/:id — видалення запису
### Rooms
POST /v1/rooms — створення запису

GET /v1/rooms — отримання всіх записів

GET /v1/rooms/:id — отримання запису за певним ID (номером кімнати)

PATCH /v1/rooms/:id — модифікування запису

DELETE /v1/rooms/:id — видалення запису

### Histories

POST /v1/histories — створення запису

GET /v1/histories — отримання всіх записів

GET /v1/histories/:id — отримання запису за певним ID

PATCH /v1/histories/:id — модифікування запису

DELETE /v1/histories/:id — видалення запису

## Скріншоти з Postman
POST /v1/students — створення запису
![students](/img/post_students.jpg)
GET /v1/students — отримання всіх записів
![students](/img/get_students.jpg)
GET /v1/students/:id — отримання запису за певним ID
![students](/img/get_id_students.jpg)
PATCH /v1/students/:id — модифікування запису
![students](/img/patch_students.jpg)
DELETE /v1/students/:id — видалення запису
![students](/img/delete_histories.jpg)

POST /v1/rooms — створення запису
![rooms](/img/post_rooms.jpg)
GET /v1/rooms — отримання всіх записів
![students](/img/get_rooms.jpg)
GET /v1/rooms/:id — отримання запису за певним ID (номером кімнати)
![students](/img/get_id_rooms.jpg)
PATCH /v1/rooms/:id — модифікування запису
![students](/img/patch_rooms.jpg)
DELETE /v1/rooms/:id — видалення запису
![students](/img/delete_rooms.jpg)

POST /v1/histories — створення запису
![histories](/img/post_histories.jpg)
GET /v1/histories — отримання всіх записів
![students](/img/get_histories.jpg)
GET /v1/hietories/:id — отримання запису за певним ID
![students](/img/get_id_histories.jpg)
PATCH /v1/histories/:id — модифікування запису
![students](/img/patch_histories.jpg)
DELETE /v1/histories/:id — видалення запису
![students](/img/delete_students.jpg)