# SmartPark HR Management System

## Name and Description

**SmartPark HR Management System** is a full-stack Human Resources and Payroll Management application designed to help organizations manage departments, employees, salaries, and administrative operations efficiently.

It provides a simple dashboard for monitoring staff records, department structure, payroll processing, and overall business insights.

## Overview

SmartPark HR Management System is built to streamline HR activities for a growing organization. The application combines a React-based frontend with a Node.js/Express backend and a MySQL database to support:

- Employee records management
- Department and organizational structure handling
- Payroll and salary processing
- Administrative dashboard overview
- Secure authentication and role-based access

## Features

- User authentication and authorization
- Dashboard with summary statistics
- Employee registration, editing, and deletion
- Department management with salary allocation details
- Salary processing with gross and deduction calculations
- Net salary automation
- Responsive modern UI
- PDF report support for summaries and admin reporting

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React PDF

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- bcryptjs
- cors
- dotenv

## Project Structure

```text
SmartPack/
├── backend_project/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── frontend_project/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── ui/
    │   └── App.jsx
    ├── package.json
    └── vite.config.js
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or newer)
- npm or yarn
- MySQL database
- Git

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd SmartPack
```

2. Install backend dependencies:

```bash
cd backend_project
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend_project
npm install
```

## Environment Variables

Create a `.env` file in the `backend_project` folder and add the following values:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=smartpark_hr
```

> Make sure your MySQL server is running and the database exists before starting the backend.

## Running the Application

### Start the backend

```bash
cd backend_project
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Start the frontend

```bash
cd frontend_project
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Notes

- The application uses MySQL through Sequelize.
- The frontend communicates with the backend through API requests.
- You may need to create the database manually in MySQL before the first run.
