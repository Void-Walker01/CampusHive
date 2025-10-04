<div align="center">
  <h1>🐝 CampusHive</h1>
  <p><strong>Your Digital Campus Hub — Connecting Students, Clubs, and Events at IIT (ISM) Dhanbad.</strong></p>
  <br />
</div>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js Badge">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge">
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io Badge">
  <br>
  <img src="https://img.shields.io/badge/status-in%20progress-blue?style=for-the-badge" alt="Project Status">
</p>

---

## 📋 Table of Contents

- [🎯 About The Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🚀 Tech Stack](#-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [🛠️ Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
- [🤝 How to Contribute](#-how-to-contribute)
- [📄 License](#-license)
- [🧑‍💻 Contact](#-contact)

---

## 🎯 About The Project

**CampusHive** is a full-stack web application built to create a unified digital ecosystem for the students of IIT (ISM) Dhanbad. Our mission is to bridge the gap between students, campus clubs, and events by providing a single, intuitive platform. From real-time chat and interactive feeds to a centralized hub for all campus happenings, CampusHive is designed to be the ultimate one-stop-shop for campus life.
(Note: the free version of vercel and render can delay opening of project on deployed link you may see a blank white page wait for sometime it will open)

---

## ✨ Key Features

The project is broken down into several key modules, each with a specific focus:

| Feature Category          | Description                                                                                              | Status             |
| :------------------------ | :------------------------------------------------------------------------------------------------------- | :----------------- |
| **🔐 Core & Authentication** | Scalable Node.js backend, secure JWT authentication,  | ✅ **Complete** |
| **💬 Community Engagement** | interactive feeds, profile discovery, anonymous confessions, and fun polls.             | ✅ **Complete** |
| **🔔 Real-time** | Real-time chat,     Instant alerts for messages, event updates, and feed activity so you never miss a beat.                  | 🚧 **In Progress** |

---

## 🚀 Tech Stack

This project is built with a modern, scalable MERN-based stack and other leading technologies.

-   **Frontend:** React.js, Tailwind CSS, React Router, Axios
-   **Backend:** Node.js, Express.js, Mongoose
-   **Real-time Communication:** Socket.io
-   **Database:** MongoDB
-   **Authentication:** JSON Web Tokens (JWT)
-   **Environment Management:** `dotenv`, `cors`
---

## 🏗️ Project Structure

The repository is organized into a clean monorepo structure to keep the frontend and backend code separate and maintainable.

```bash
CampusHive/
├── backend/        # Express.js + MongoDB API Server
├── frontend/       # React.js Client Application
└── README.md       # You are here!
```

---

## 🛠️ Getting Started

Follow these instructions to get the backend server up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:
* **Node.js** (v18.x or higher recommended)
* **npm** (or yarn)
* **MongoDB** (You can use a local instance or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Backend Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/CampusHive.git
    cd CampusHive/backend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    Create a `.env` file in the `/backend` directory and add the following configuration. **Do not** commit this file to version control.
    ```env
    # Server Port
    PORT=5000

    # MongoDB Connection URI
    MONGO_URI=your-mongodb-connection-string

    # JWT Secret Key (use a long, random string)
    JWT_SECRET=your-super-secret-key
    ```

4.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    The server will start, and you should see a confirmation message in your terminal. By default, it runs at `http://localhost:5000` 🚀.

---

## 🤝 How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:
1.  **Fork** the Project.
2.  Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

Please make sure your code adheres to the project's coding standards and includes tests where applicable.

---

## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information. (You'll need to add a `LICENSE.txt` file with the MIT License text).

---

## 🧑‍💻 Maintainer

**Rohit Guleria** — Feel free to reach out!

Project Link: [Live Demo](https://campus-hive-rho.vercel.app/)
