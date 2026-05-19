# Task Management Platform - Backend Setup Guide

## 🎯 Quick Fix Summary

### **Main Issue Found:**
- ❌ Database name was `taskmanager` but should be `taskmanagement`
- ✅ **FIXED** in `.env` file

---

## 📋 Prerequisites

### 1. **MongoDB Setup**
Ensure MongoDB is running on your system:

**Windows (If MongoDB is installed):**
```powershell
# Check if MongoDB service is running
Get-Service MongoDB

# If not running, start it:
Start-Service MongoDB
```

**Alternative (Docker):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 2. **Verify MongoDB Connection**
Open MongoDB Compass and check:
- ✅ Connection: `mongodb://localhost:27017`
- ✅ Database exists: `taskmanagement`

---

## 🚀 Backend Installation & Running

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Verify Dependencies
```bash
npm list
```

**Should show:**
```
├── cors@^2.8.6
├── dotenv@^17.4.2
├── express@^5.2.1
└── mongoose@^9.6.2
```

**If missing, install:**
```bash
npm install
```

### Step 3: Start the Backend Server
```bash
npm start
```

**Expected Output:**
```
🔌 Attempting to connect to MongoDB...
🔗 Connection URI: mongodb://127.0.0.1:27017/taskmanagement
✅ MongoDB Connected Successfully!
🖥️  Host: localhost
📦 Database: taskmanagement
🔍 Connection State: Connected
Server running on port 5000
```

---

## ✅ Verification Steps

### 1. **Test MongoDB Connection**
```bash
curl http://localhost:5000/
```
Response: `"Task Manager API is running..."`

### 2. **Create a Test Task** (Postman)
```
POST http://localhost:5000/tasks
Content-Type: application/json

{
  "title": "Test Task",
  "status": "Planned",
  "userId": "user123"
}
```

### 3. **Verify in MongoDB Compass**
- Open MongoDB Compass
- Navigate to: `taskmanagement` → `tasks` collection
- Check if your test task appears

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── taskController.js     # Business logic
├── models/
│   └── Task.js              # Task schema
├── routes/
│   └── taskRoutes.js        # API endpoints
├── .env                      # Environment variables
├── server.js                # Express app setup
└── package.json
```

---

## 🔧 Environment Variables (.env)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taskmanagement
```

**⚠️ IMPORTANT:** 
- Do NOT commit `.env` to Git
- Add `.env` to `.gitignore`
- Database name MUST be `taskmanagement` (not `taskmanager`)

---

## 📡 API Endpoints

### Create Task
```
POST /tasks
Body: {
  "title": "Buy groceries",
  "status": "Planned",
  "userId": "user123"
}
Response: { _id, title, status, userId, createdAt }
```

### Get User Tasks
```
GET /tasks/:userId
Response: Array of tasks for that user
```

### Update Task Status
```
PUT /tasks/:id
Body: { "status": "In Progress" }
Response: Updated task object
```

### Delete Task
```
DELETE /tasks/:id
Response: { message: "Task deleted successfully", task }
```

---

## 🐛 Troubleshooting

### ❌ "MongoDB Connection Failed"
**Solutions:**
1. Verify MongoDB is running:
   ```bash
   # Windows
   Get-Service MongoDB | Select-Object Status
   
   # or check MongoDB Compass connection
   ```
2. Check `.env` has correct `MONGODB_URI`
3. Ensure database name is `taskmanagement` not `taskmanager`
4. Check firewall allows port 27017

### ❌ "Connection Timeout"
- MongoDB service is not running
- Start MongoDB service or use Docker

### ❌ "Tasks not appearing in MongoDB Compass"
1. Hard refresh MongoDB Compass (F5)
2. Check correct database: `taskmanagement`
3. Check correct collection: `tasks`

### ❌ CORS Errors
- Already enabled in `server.js`
- Frontend must use `http://localhost:5000`

---

## 🔄 Common Reasons Tasks Not Saving

1. **❌ MongoDB not running**
   - Solution: Start MongoDB service

2. **❌ Wrong database name in .env**
   - Solution: Use `taskmanagement` not `taskmanager`

3. **❌ userId not provided in request**
   - Solution: Include `userId` in POST body

4. **❌ Server not connected to MongoDB**
   - Solution: Check console for connection error

5. **❌ Mongoose validation failed**
   - Solution: Ensure `title` and `userId` are provided

6. **❌ Network/Firewall blocking port 27017**
   - Solution: Check firewall settings

---

## 📊 Development Workflow

```bash
# Terminal 1: Start MongoDB (if not using Docker)
Get-Service MongoDB | Start-Service

# Terminal 2: Start Backend
cd backend
npm start

# Terminal 3: Start Frontend (in another project folder)
cd frontend
npm start
```

---

## 🎓 Next Steps

1. ✅ Backend is now properly configured
2. 📝 Integrate frontend code (see FRONTEND_EXAMPLE.md)
3. 🧪 Test with Postman (see POSTMAN_GUIDE.md)
4. 🚀 Deploy when ready

---

**Generated:** May 19, 2026
**Version:** 1.0
