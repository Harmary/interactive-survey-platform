# Interactive Survey Platform

![Interactive Survey Platform](https://img.shields.io/badge/Interactive-Survey%20Platform-blue)

## Описание

Проект Interactive Survey Platform предоставляет приложение для управления интерактивными опросами с поддержкой WebSocket. Этот проект включает функции создания, получения, удаления и голосования в опросах.

## Функциональность

- **Создание опросов**: Создание новых опросов с различными вариантами ответов.
- **Получение опросов**: Получение списка всех доступных опросов.
- **Удаление опросов**: Удаление опросов по их ID.
- **Голосование**: Голосование за один из вариантов в опросе.

## Технологии

- **Backend**: NestJS, TypeORM
- **Frontend**: React, Material-UI
- **WebSocket**: Socket.IO
- **База данных**: PostgreSQL
- **Контейнеризация**: Docker, Docker Compose

## Запуск проекта

### Предварительные требования

- Docker
- Docker Compose

### Локальный запуск

1. Клонируйте репозиторий:

   ```
   git clone https://github.com/Harmary/interactive-survey-platform.git
   cd interactive-survey-platform
   ```

2. Запустите docker-compose.local
   `docker-compose -f .\docker-compose.local.yml up`
3. Откройте приложение по адресу http://localhost:80

### API Документация

После запуска приложения, вы можете получить доступ к документации API по следующему адресу http://localhost:3000/api
