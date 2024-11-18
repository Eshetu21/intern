# Todo List App

A simple Todo List application built with **Flutter** as the frontend and **Laravel** as the backend. This app allows you to add, update, delete, and manage tasks categorized as **Pending** or **Completed**. The tasks are stored in a Laravel-based backend database.

## Features
- **Add** new todos with a title and description.
- **Update** existing todos.
- **Delete** todos from the list.

## Requirements
- **Flutter**
- **MySQL** or another compatible database for Laravel

## Installation

### Backend Setup (Laravel)

**Clone the repository**:
   ```bash
   git clone https://github.com/Eshetu21/intern.git
   ```
   ```
   cd laravel-backend
   ```
   ```
   composer install
   ```
### Copy the .env
   cp .env.example .env
### Make sure the database connection is set
   DB_CONNECTION=mysql\
   DB_HOST=127.0.0.1\
   DB_PORT=3306\ 
   DB_DATABASE=api\
   DB_USERNAME=root\
   DB_PASSWORD=\   
### Run to migrate
   ```
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

### Frontend Setup (React)
   ```
   cd flutter-todo
   flutter pub get
   ```
### Screenshots

Here are some screenshots of the Todo app:

<p align="center">
  <img src="assets/1.jpg" alt="Screenshot 1" width="200"/>
  <img src="assets/2.jpg" alt="Screenshot 2" width="200"/>
</p>




