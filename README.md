# CodeConnect Classroom
### Collaborative Code Editor

> A real-time collaborative coding platform enabling teachers to create virtual classrooms and students to code together — live.
> 📄 *This project resulted in a published research paper.*

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React.js-20232A?style=flat&logo=react)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express)
![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=flat)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

---

## Features

- **Real-time collaboration** — multiple users edit code simultaneously in the same room via WebSockets
- **Room-based sessions** — any user can create a room and share its unique Room ID to invite others
- **Virtual classrooms** — teachers create rooms; students log in to the same shared editor
- **Invite via Room ID** — instant join with a shared ID, no sign-up friction for guests

---

## User Roles

| Role | Permissions |
|------|-------------|
| **Teacher** | Create a room, share Room ID, edit and guide live |
| **Student** | Join via Room ID, collaborate and code in real time |

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-org/codeconnect-classroom.git

# 2. Install dependencies
cd server && npm install
cd ../client && npm install

# 3. Set up environment
cp .env.example .env   # add your MONGO_URI and PORT

# 4. Start the backend
cd server && npm start

# 5. Start the frontend
cd client && npm start

# 6. Open http://localhost:3000
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Frontend | React.js |
| Backend | Express.js |
| Real-time | WebSockets (Socket.io) |
| Database | MongoDB |

---

## How It Works

1. A user (teacher) **creates a room** — a unique Room ID is generated.
2. The Room ID is **shared** with students.
3. Students **join the room** and are dropped into the same live code editor.
4. All edits are **broadcast in real time** to every connected user via WebSockets.
5. Session data is **persisted** in MongoDB.

---

## Research

This project was the basis of a **published research paper** demonstrating its academic and practical impact on collaborative coding education.

---

## License

MIT
