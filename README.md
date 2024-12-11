# TaskManagerApp

<p align="center">
    <img src="readmeassets/landing.png" width=600>
</p>

---

## Project Goals

TaskManagerApp is designed to simplify task management by providing a centralized platform to plan, organize, and track tasks effectively. Its key goals include:

1. **Ease of Use**: A minimalistic and user-friendly interface designed for individuals and teams.
2. **Feature-Focused Development**: Core features are prioritized to meet user needs effectively while leaving room for future enhancements.
3. **Efficiency and Reliability**: Fast and dependable tools for managing tasks, ensuring user satisfaction.

---

## Table of Contents

- [TaskManagerApp](#taskmanagerapp)
  - [Project Goals](#project-goals)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Design](#design)
    - [Colors](#colors)
    - [Fonts](#fonts)
  - [Core Pages](#core-pages)
    - [Landing Page](#landing-page)
    - [Registration Page](#registration-page)
    - [Login Page](#login-page)
    - [Dashboard](#dashboard)
  - [State Management](#state-management)
  - [Testing and Validation](#testing-and-validation)
  - [Future Improvements](#future-improvements)
  - [Deployment](#deployment)
  - [Credits](#credits)

---

## Features

### Core Features
- **Task Management**: Users can create, update, and delete tasks easily.
- **User Authentication**: Secure registration and login processes.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Snappy Notifications**: User-friendly snackbars replace intrusive alerts.
- **Role-Based Views**: Different functionalities for regular users and administrators.

### CRUD Functionality

This project implements full **Create**, **Read**, **Update**, and **Delete** functionality via the React-based UI and Django Rest Framework API.

#### **Create**
- Users can register new accounts using their email and password.
- Authenticated users can create new tasks, specifying details such as title, description, and deadline.

#### **Read**
- Users can view a list of tasks they have created, along with their details (title, description, deadline, and status).
- Logged-in users can view their profile information, including their email address.

#### **Update**
- Users can update their tasks, modifying details such as the title, description, and deadline.
- Profile updates allow users to change their passwords.

#### **Delete**
- Users can delete tasks they no longer need.
- Users can delete their accounts, removing their profile and tasks from the system.

This core CRUD functionality empowers users to efficiently manage their tasks and profiles, providing an intuitive and user-friendly experience.

## Design


### Colors
The application follows a clean and modern color scheme, designed for simplicity and accessibility:

| Purpose              | Color Code | Example Color                        |
|----------------------|------------|--------------------------------------|
| Primary Accent       | `#aca3d3`  | ![#aca3d3](https://via.placeholder.com/15/aca3d3/aca3d3.png) |
| Secondary Accent     | `#9e9cc3`  | ![#9e9cc3](https://via.placeholder.com/15/9e9cc3/9e9cc3.png) |
| Highlight            | `#cd584f`  | ![#cd584f](https://via.placeholder.com/15/cd584f/cd584f.png) |
| Background           | `#ebebea`  | ![#ebebea](https://via.placeholder.com/15/ebebea/ebebea.png) |
| Light Font           | `#ffffff`  | ![#ffffff](https://via.placeholder.com/15/ffffff/ffffff.png) |
| Dark Font            | `#2b2b2b`  | ![#2b2b2b](https://via.placeholder.com/15/2b2b2b/2b2b2b.png) |
| Muted Background     | `#b7b3cd`  | ![#b7b3cd](https://via.placeholder.com/15/b7b3cd/b7b3cd.png) |
| Accent Contrast      | `#ccc4e7`  | ![#ccc4e7](https://via.placeholder.com/15/ccc4e7/ccc4e7.png) |
| Highlight Contrast   | `#6c7c2c`  | ![#6c7c2c](https://via.placeholder.com/15/6c7c2c/6c7c2c.png) |
| Tertiary Background  | `#746c76`  | ![#746c76](https://via.placeholder.com/15/746c76/746c76.png) |

### Fonts
- **Body Font**: Arial for content and UI clarity.
- **Enhance Font**: Lora (Italic) for hero sections and inspirational text.

---

## Core Pages

### Landing Page
A visually appealing introduction to TaskManagerApp with:
- Hero section featuring the tagline "Never Miss a Task."
- Highlighted features presented in cards with rounded edges.
- Testimonials and engaging call-to-action elements.

<p align="center">
    <img src="readmeassets/landing.png" width=500>
</p>

---

### Registration Page
A simple form allowing users to create an account with:
- Real-time validation for passwords and email uniqueness.
- Intuitive error/success indicators.

<p align="center">
    <img src="readmeassets/register.png" width=500>
</p>

---

### Login Page
A quick and secure login experience featuring:
- Smooth transitions and responsive design.
- Error handling with user-friendly notifications.

<p align="center">
    <img src="readmeassets/login.png" width=500>
</p>

---

### Dashboard
The central hub for managing tasks:
- Add, edit, and delete tasks.
- Snappy task filtering and categorization.
- Dynamic role-based actions for users and admins.

<p align="center">
    <img src="" width=500>
</p>

---

## State Management
The application uses React state hooks for:
- **Authentication**: Maintaining user login status and tokens.
- **Task Updates**: Automatically refreshing the task list on changes.
- **UI Notifications**: Triggering Snackbars for user feedback.

---

## Testing and Validation

- **Manual Testing**: Tasks were tested across major browsers and devices to ensure responsiveness and functionality.

INSERT TESTING.MD

- **Accessibility**: Validated with WAVE tools and Lighthouse for 100% accessibility scores.
- **Code Validation**: Passed through ESLint and W3C CSS Validator.

---

## Future Improvements

1. **Integration with Calendars**: Sync tasks with third-party calendar apps.
2. **Enhanced Filters**: Add advanced filtering options for task categorization.
3. **Multiple Owners**: Ability to assign a task for someone else.
---

## Deployment



---

## Credits

### Code
- Snackbar implementation adapted from Material-UI documentation.
- TaskManagerApp design inspired by leading task management tools.

### Media
- Icons by [MUI]().

