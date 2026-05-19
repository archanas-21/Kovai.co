# 🧪 Postman Testing Guide

## 📥 Installation

1. Download Postman: https://www.postman.com/downloads/
2. Install and launch
3. Create a new workspace

---

## 🚀 Testing Endpoints

### **Base URL:** `http://localhost:5000`

---

## 1️⃣ **Check Server Status**

```
GET http://localhost:5000/
```

**Headers:** None

**Response (200):**
```
"Task Manager API is running..."
```

---

## 2️⃣ **Create a Task** ✅ Most Important

```
POST http://localhost:5000/tasks
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Buy groceries",
  "status": "Planned",
  "userId": "user123"
}
```

**Expected Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "status": "Planned",
  "userId": "user123",
  "createdAt": "2024-05-19T10:30:00.000Z",
  "__v": 0
}
```

**Errors:**
- **400**: Missing `title` or `userId`
- **500**: MongoDB connection failed

---

## 3️⃣ **Get All Tasks for a User**

```
GET http://localhost:5000/tasks/user123
```

**Headers:** None

**Expected Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "status": "Planned",
    "userId": "user123",
    "createdAt": "2024-05-19T10:30:00.000Z",
    "__v": 0
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "status": "In Progress",
    "userId": "user123",
    "createdAt": "2024-05-19T11:00:00.000Z",
    "__v": 0
  }
]
```

---

## 4️⃣ **Update Task Status**

```
PUT http://localhost:5000/tasks/507f1f77bcf86cd799439011
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "status": "In Progress"
}
```

**Expected Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "status": "In Progress",
  "userId": "user123",
  "createdAt": "2024-05-19T10:30:00.000Z",
  "__v": 0
}
```

---

## 5️⃣ **Delete Task**

```
DELETE http://localhost:5000/tasks/507f1f77bcf86cd799439011
```

**Headers:** None

**Expected Response (200):**
```json
{
  "message": "Task deleted successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Buy groceries",
    "status": "In Progress",
    "userId": "user123",
    "createdAt": "2024-05-19T10:30:00.000Z",
    "__v": 0
  }
}
```

---

## 📊 Complete Testing Workflow

### **Step 1: Create Multiple Tasks**

Create 3 different tasks with different statuses:

**Task 1:**
```json
{
  "title": "Design database schema",
  "status": "Complete",
  "userId": "user123"
}
```

**Task 2:**
```json
{
  "title": "Build API endpoints",
  "status": "In Progress",
  "userId": "user123"
}
```

**Task 3:**
```json
{
  "title": "Write unit tests",
  "status": "Planned",
  "userId": "user123"
}
```

### **Step 2: Fetch All Tasks**
```
GET http://localhost:5000/tasks/user123
```
✅ Should return all 3 tasks

### **Step 3: Update a Task**
```
PUT http://localhost:5000/tasks/{_id_from_step1}
Body: { "status": "In Progress" }
```
✅ Task status should change

### **Step 4: Delete a Task**
```
DELETE http://localhost:5000/tasks/{_id_from_step1}
```
✅ Task should be removed

### **Step 5: Verify Deletion**
```
GET http://localhost:5000/tasks/user123
```
✅ Should return only 2 tasks now

---

## ✅ Verification in MongoDB Compass

After creating tasks via Postman:

1. **Open MongoDB Compass**
2. **Connect** to `mongodb://localhost:27017`
3. **Navigate** to: `taskmanagement` → `tasks`
4. **View** the documents you created

---

## 🐛 Troubleshooting in Postman

### ❌ "Failed to connect to localhost:5000"
- Backend is not running
- Start backend: `npm start` in `/backend` folder

### ❌ "mongodb connection failed" (500 error)
- MongoDB is not running
- Start MongoDB service

### ❌ "Invalid status value" (400 error)
- Status must be one of: `Planned`, `In Progress`, `Complete`
- Check spelling exactly

### ❌ "UserId required" (400 error)
- Include `userId` in JSON body

---

## 🔍 Debug Tips

### Enable Console Logging
In Postman, after each request:
1. Look at **Response** tab
2. Check **Status code** (201 for success)
3. Check **Response body** for errors

### Test with Different UserIds
Try creating tasks for different users:
- `user123`
- `user456`
- `john_doe`

Then fetch each user's tasks separately to verify they're isolated.

---

## 📋 Complete Request Collection

### Create 3 Users' Tasks

**User 1 (user123):**
```bash
POST /tasks
{
  "title": "Team meeting at 3pm",
  "status": "Planned",
  "userId": "user123"
}
```

**User 2 (user456):**
```bash
POST /tasks
{
  "title": "Fix login bug",
  "status": "In Progress",
  "userId": "user456"
}
```

**User 3 (john_doe):**
```bash
POST /tasks
{
  "title": "Update documentation",
  "status": "Complete",
  "userId": "john_doe"
}
```

Then fetch each:
```
GET /tasks/user123
GET /tasks/user456
GET /tasks/john_doe
```

✅ Each should return only their own tasks

---

## 🎯 Next Steps

1. ✅ Test all endpoints in Postman
2. ✅ Verify tasks appear in MongoDB Compass
3. ✅ Verify tasks are isolated by userId
4. ✅ Integrate with frontend (use FRONTEND_EXAMPLE.jsx)

---

**Last Updated:** May 19, 2026
