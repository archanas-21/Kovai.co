# 🔧 Complete Troubleshooting Guide

## 🚨 Problem 1: "Tasks Not Saving to MongoDB"

### **Root Causes & Solutions**

#### ❌ **Cause 1: MongoDB Not Running**

**Symptoms:**
- Console shows: "MongoDB Connection Failed"
- Postman: 500 error when creating tasks

**Solution (Windows):**
```powershell
# Check if MongoDB service is running
Get-Service MongoDB

# If Status is "Stopped", start it
Start-Service MongoDB

# Verify it's running
Get-Service MongoDB | Select-Object Status
```

**Solution (Docker Alternative):**
```bash
# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or if container already exists
docker start mongodb
```

**Verification:**
- Open MongoDB Compass
- Try connecting to `mongodb://localhost:27017`
- Should see connection successful

---

#### ❌ **Cause 2: Wrong Database Name in .env**

**Symptoms:**
- Tasks created but don't appear in MongoDB Compass
- Wrong database shows in compass

**Solution:**
1. Open `backend/.env`
2. Verify line: `MONGODB_URI=mongodb://127.0.0.1:27017/taskmanagement`
3. **Database name MUST be `taskmanagement` NOT `taskmanager`**

**Check:**
```
mongodb://localhost:27017/taskmanagement  ✅ Correct
mongodb://localhost:27017/taskmanager     ❌ Wrong
```

---

#### ❌ **Cause 3: Missing or Invalid userId in Request**

**Symptoms:**
- Postman shows: `"Please provide a title and user ID"`
- Tasks partially created but inaccessible

**Solution (Postman):**
```json
{
  "title": "My Task",
  "status": "Planned",
  "userId": "user123"  // ← MUST be included
}
```

**Solution (Frontend Code):**
```javascript
const formData = {
  title: "Buy groceries",
  status: "Planned",
  userId: "user123"  // ← MUST be included
};

const response = await axios.post(
  'http://localhost:5000/tasks',
  formData
);
```

---

#### ❌ **Cause 4: Server Not Running or Wrong Port**

**Symptoms:**
- Frontend shows: "Failed to connect to localhost:5000"
- Postman shows: "Failed to connect"

**Solution:**
```bash
cd backend
npm start
```

**Expected Output:**
```
🔌 Attempting to connect to MongoDB...
✅ MongoDB Connected Successfully!
Server running on port 5000
```

**Verify:**
```bash
# In another terminal, test the connection
curl http://localhost:5000/
# Should return: "Task Manager API is running..."
```

---

#### ❌ **Cause 5: CORS Errors (Frontend)**

**Symptoms:**
- Browser console shows: "Access-Control-Allow-Origin"
- Postman works but frontend doesn't

**Solution:**
CORS is already enabled in `server.js`. Check:
1. Frontend URL: `http://localhost:5000` (not https)
2. Frontend and backend running on different ports? That's normal
3. Check browser console for exact error

---

#### ❌ **Cause 6: MongoDB Connection Timeout**

**Symptoms:**
- Error: "MongoDB Connection Timeout"
- Server starts but then errors

**Solution:**
1. **Check MongoDB Status:**
   ```powershell
   Get-Service MongoDB
   ```

2. **Check Firewall:**
   - Windows Firewall must allow port 27017
   - Antivirus might block MongoDB

3. **Check Connection String:**
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/taskmanagement
   
   # Try this if above doesn't work:
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   ```

4. **Restart MongoDB:**
   ```powershell
   Stop-Service MongoDB
   Start-Service MongoDB
   ```

---

## 🚨 Problem 2: "Can't See Tasks in MongoDB Compass"

### **Solutions**

#### Step 1: Hard Refresh
- Press **F5** in MongoDB Compass
- Sometimes UI doesn't auto-update

#### Step 2: Verify Correct Database
- Left sidebar → Select `taskmanagement` (not other databases)
- Click `tasks` collection

#### Step 3: Check If Collection Exists
```
Expected structure:
taskmanagement/
├── tasks/        ← This collection should exist
│   └── [task documents]
└── [other collections]
```

#### Step 4: Insert Test Document via Compass
1. Open MongoDB Compass
2. Select `taskmanagement` database
3. Click "+" to create new collection named `tasks`
4. Insert a test document manually
5. Try creating task via Postman again

---

## 🚨 Problem 3: "Postman Returns Empty Array"

### **Symptoms:**
- POST /tasks returns 201 (success)
- But GET /tasks/:userId returns empty `[]`

### **Causes & Solutions**

#### Cause 1: Different UserIds
```
Created with: userId: "user123"
Fetched with: /tasks/user456  ← Different userId!
```

**Solution:**
- Use SAME userId for creating and fetching

#### Cause 2: MongoDB Compass Not Refreshed
- Hard refresh MongoDB Compass (F5)
- Check `taskmanagement` → `tasks` collection

#### Cause 3: Tasks Created Before Fixing .env
- If you created tasks with wrong database name
- They're in the wrong database
- Create new tasks after fixing .env

---

## 🚨 Problem 4: "TypeError: Cannot read property 'databaseName'"

### **Cause:**
- MongoDB connection failed
- Trying to access database that doesn't exist

### **Solution:**
1. Verify MongoDB is running
2. Check `.env` has correct MONGODB_URI
3. Restart server: `npm start`

---

## 🚨 Problem 5: "ECONNREFUSED - Connection Refused"

### **Cause:**
- MongoDB service not running
- Firewall blocking port 27017

### **Solution:**

**Windows:**
```powershell
# Start MongoDB service
Start-Service MongoDB

# Verify it started
Get-Service MongoDB | Select-Object Status

# Should show: Status: Running
```

**Docker:**
```bash
# Check if container is running
docker ps

# If not running, start it
docker start mongodb

# If container doesn't exist, create it
docker run -d -p 27017:27017 --name mongodb mongo
```

---

## 🚨 Problem 6: "Tasks Disappear After Refresh"

### **Cause:**
- Server restarted and lost connection
- Data wasn't actually saved

### **Solution:**
1. Check MongoDB Compass - are tasks there?
2. If YES in Compass but not in Postman:
   - Server not connected to DB
   - Restart backend: `npm start`
3. If NO in Compass:
   - MongoDB connection wasn't working
   - Check causes 1-2 above

---

## ✅ Quick Verification Checklist

Before troubleshooting, go through this:

```
☐ MongoDB is running (Services > MongoDB)
☐ .env has correct database: taskmanagement
☐ .env has correct port: 5000
☐ Backend server is running: npm start
☐ Server console shows: "MongoDB Connected Successfully!"
☐ Postman can reach: GET http://localhost:5000/
☐ userId included in POST request body
☐ task title included in POST request body
☐ MongoDB Compass shows taskmanagement database
☐ MongoDB Compass shows tasks collection
```

If all ✅, system should work!

---

## 🔍 Debug Mode: Detailed Logging

### Enable Mongoose Debugging

Add to `server.js`:
```javascript
import mongoose from 'mongoose';

// Enable detailed logging
mongoose.set('debug', true);
```

Now you'll see every MongoDB operation in console.

---

## 🧪 Run Verification Script

```bash
cd backend
node verify-setup.js
```

This will:
1. ✅ Check .env configuration
2. ✅ Test MongoDB connection
3. ✅ Test write operation
4. ✅ Show detailed status

---

## 📞 Getting Help

If still stuck, provide:

1. **Console Output** from backend:
   ```bash
   npm start
   # Copy all output
   ```

2. **Postman Response** when creating task:
   ```
   Status code: ___
   Response body: ___
   ```

3. **.env file** (without passwords):
   ```env
   PORT=___
   MONGODB_URI=___
   ```

4. **Screenshot** from MongoDB Compass

---

**Last Updated:** May 19, 2026
**Version:** 2.0
