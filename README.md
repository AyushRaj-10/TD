# Todo Management Application

A full-stack Todo Management application built with **React**, **Node.js**, **Express**, and **MongoDB**. The application allows users to create, manage, search, filter, update, and delete todos through a clean and responsive interface.

This project was developed as a CRUD application while following a modular architecture and modern full-stack development practices.

---

# Features

## Frontend

* Responsive UI built with React and Tailwind CSS
* Multiple-page application using React Router
* Create new todos
* View all todos
* Search todos by title
* Filter todos

  * All
  * Completed
  * Pending
* Toggle todo completion status
* Delete todos
* Dedicated Todo Details page
* Loading and empty states
* Reusable React components

## Backend

* RESTful API using Express.js
* MongoDB database with Mongoose
* Full CRUD operations
* Modular MVC architecture
* Proper API error handling
* Environment variable configuration
* Clean and scalable project structure

---

# Tech Stack

## Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Dotenv
* CORS

---

# Project Structure

```text
todo-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

# API Endpoints

## Get All Todos

```http
GET /api/todos
```

Returns every todo stored in the database.

---

## Get Single Todo

```http
GET /api/todos/:id
```

Returns a specific todo.

---

## Create Todo

```http
POST /api/todos
```

Example Request

```json
{
  "title": "Complete assignment",
  "description": "Finish the Todo project"
}
```

---

## Update Todo

```http
PUT /api/todos/:id
```

Example Request

```json
{
  "completed": true
}
```

---

## Delete Todo

```http
DELETE /api/todos/:id
```

Deletes the specified todo.

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd todo-app
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

Start the backend server.

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000/api/todos
```

Start the development server.

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

# Environment Variables

## Backend

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

## Frontend

```env
VITE_API_URL=http://localhost:5000/api/todos
```

---

# Application Flow

1. User opens the Todo Dashboard.
2. The frontend requests all todos from the backend.
3. The backend retrieves data from MongoDB.
4. Todos are displayed on the dashboard.
5. Users can:

   * Create a todo
   * Search todos
   * Filter todos
   * Mark todos as completed
   * Delete todos
   * Open a dedicated details page for any todo
6. Any modification updates MongoDB and refreshes the UI.


# Learning Outcomes

This project demonstrates:

* React component architecture
* React Router navigation
* REST API development
* CRUD operations
* MongoDB integration with Mongoose
* Express.js backend architecture
* Tailwind CSS styling
* Client-server communication using Axios
* Environment variable management
* Modular full-stack application development

---

# License

This project is intended for educational and learning purposes.
