🐝 CampusHive
<p align="center">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io">
<img src="https://img.shields.io/badge/status-in%20progress-blue?style=for-the-badge" alt="Status">
</p>

CampusHive is a full-stack web application designed exclusively for IIT (ISM) Dhanbad to create a vibrant, connected, and streamlined digital campus ecosystem. It enhances student networking, event management, and club interactions, bringing the entire campus community together on one platform.

✨ Features
Our goal is to build a comprehensive platform. Here’s a look at what's complete, in progress, and planned for the future.

🔐 Core & Authentication (Backend Complete)
Scalable Backend: Built with a robust and modular architecture using Node.js and Express.

Secure Authentication: JWT-based authentication to protect user data and sessions.

Role-Based Access Control: Differentiated permissions for Admin, Student, and Club Coordinator roles.

Database: MongoDB with Mongoose ORM for flexible and powerful data modeling.

💬 Community & Engagement (In Development)
Real-time Chat: Instant messaging for one-on-one and group conversations using Socket.io.

Interactive Feeds: Users can post updates, with likes and comments to foster engagement.

Profile Discovery: Search for peers, view profiles, and build your network across batches and branches.

Anonymous Confessions: A safe space for students to share thoughts and confessions anonymously.

Fun Polls: Create and participate in polls on academic and extracurricular topics.

🎉 Event & Club Hub (Upcoming)
Event & Club Discovery: A centralized dashboard to find upcoming events and join clubs, with smart filters.

Media Uploads: Seamlessly upload event posters, profile pictures, and post images.

Real-time Notifications: Stay updated on event announcements, new messages, and friend requests.

📊 Admin & Analytics (Upcoming)
Admin Dashboard: A control panel for admins to manage users, monitor activity, and oversee platform health.

🚀 Tech Stack
Category	Technology
🖥️ Frontend	React.js, Tailwind CSS, React Router, Axios
⚙️ Backend	Node.js, Express.js, Mongoose, Socket.io, JSON Web Token (JWT), dotenv, CORS
🗂️ Database	MongoDB
☁️ Deployment	(To be decided - e.g., Vercel, Netlify, AWS)

Export to Sheets
🏗️ Project Structure
CampusHive/
├── backend/        # Deployed Express + MongoDB (Node.js server)
├── frontend/       # Under Development (React.js frontend)
└── README.md       # You are here!
📈 Project Status
✅ Backend: The core backend API is built, tested, and deployed. It's ready to serve the frontend application.

🚧 Frontend: The React frontend is under active development. We are currently building the UI/UX for all the exciting features listed above.

🔗 Integration: Connecting the frontend with the backend API is the next major milestone.

🛠️ Getting Started (Backend Setup)
Clone the repository

Bash

git clone https://github.com/YOUR_USERNAME/CampusHive.git
cd CampusHive/backend
Install dependencies

Bash

npm install
Set up environment variables
Create a .env file in the /backend directory and add the following:

Ini, TOML

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-super-secret-key-for-jwt
Run the development server
This command uses nodemon for automatic server restarts on file changes.

Bash

npm run dev
The server will be running on http://localhost:5000.

🤝 Contribution
Pull requests are welcome! This is a community-driven project, and your contributions are highly valued. For major changes, please open an issue first to discuss what you would like to change or add.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

🧑‍💻 Maintained By
Me ✌️