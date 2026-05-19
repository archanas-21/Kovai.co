# Full-Stack Task Management Application

A responsive task management application where authenticated users can create tasks, view tasks, and update task status (Planned, In Progress, Complete). 

## 🚀 Features
1. **Google Login** using Firebase Authentication
2. **Create Task**: Users can add new tasks to their dashboard.
3. **View Tasks**: Display a list of tasks for the logged-in user.
4. **Update Task Status**: Seamlessly change status across three states.
5. **Filter**: Filter tasks by their current status.
6. **Responsive UI**: Built with Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios, Firebase Auth
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose
- **API Testing**: Postman Collection (provided)

## 💻 Local Setup Instructions

### 1. Backend Setup
1. Open the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure Environment Variables:
   - Open `backend/.env`
   - Set your `MONGODB_URI` connection string.
4. Start the server: `npm start` (Runs on `http://localhost:5000`)

### 2. Frontend Setup
1. Open the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Configure Environment Variables:
   - Open `frontend/.env`
   - Fill in the Firebase credentials (`VITE_FIREBASE_...`).
4. Start the development server: `npm run dev`

## 🔗 API Endpoints

| Method | Endpoint          | Description               | Body                 |
|--------|-------------------|---------------------------|----------------------|
| `POST` | `/tasks`          | Create a new task         | `{title, status, userId}`|
| `GET`  | `/tasks/:userId`  | Fetch user's tasks        | -                    |
| `PUT`  | `/tasks/:id`      | Update task status        | `{ status }`         |

## 🌍 Deployment Instructions

### Deploy Frontend to Vercel
1. Create a GitHub repository and push your project.
2. Go to Vercel and import the repository.
3. Select `frontend` as the Root Directory.
4. Add the Environment Variables (`VITE_FIREBASE_...` and `VITE_API_URL` pointing to Render backend).
5. Deploy.

### Deploy Backend to Render
1. Go to Render Dashboard and select "New Web Service".
2. Connect the GitHub repository.
3. Select `backend` as the Root Directory.
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add `MONGODB_URI` as an Environment Variable.
7. Deploy.

## 🤔 Assumptions & Limitations
- **Assumptions**: 
  - Users only need Google Authentication.
  - Tasks belong to a specific user and are not shared.
- **Limitations**:
  - Requires valid Firebase and MongoDB Atlas credentials to function fully. Without a valid `MONGODB_URI`, the backend server will start but API calls will fail.

