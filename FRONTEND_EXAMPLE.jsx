import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    status: 'Planned',
    userId: 'user123' // Replace with actual user ID
  });

  const API_BASE_URL = 'http://localhost:5000';

  // ✅ Create a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Please enter a task title');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('📤 Sending POST request to:', `${API_BASE_URL}/tasks`);
      console.log('📋 Payload:', formData);

      const response = await axios.post(`${API_BASE_URL}/tasks`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Task created successfully:', response.data);

      // Add new task to UI
      setTasks([response.data, ...tasks]);
      
      // Reset form
      setFormData({
        title: '',
        status: 'Planned',
        userId: formData.userId
      });

      alert('✅ Task created successfully!');
    } catch (err) {
      console.error('❌ Error creating task:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to create task. Check browser console.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch user tasks
  const handleFetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('📥 Fetching tasks for userId:', formData.userId);

      const response = await axios.get(
        `${API_BASE_URL}/tasks/${formData.userId}`
      );

      console.log('✅ Tasks fetched:', response.data);
      setTasks(response.data);
    } catch (err) {
      console.error('❌ Error fetching tasks:', err.response?.data || err.message);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update task status
  const handleUpdateTask = async (taskId, newStatus) => {
    try {
      console.log(`🔄 Updating task ${taskId} to status: ${newStatus}`);

      const response = await axios.put(
        `${API_BASE_URL}/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Task updated:', response.data);

      // Update UI
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
    } catch (err) {
      console.error('❌ Error updating task:', err.response?.data || err.message);
      setError('Failed to update task');
    }
  };

  // ✅ Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      console.log(`🗑️  Deleting task ${taskId}`);

      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);

      console.log('✅ Task deleted successfully');

      // Remove from UI
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error('❌ Error deleting task:', err.response?.data || err.message);
      setError('Failed to delete task');
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h1>📝 Task Manager</h1>

      {/* Error Display */}
      {error && (
        <div style={styles.error}>
          ❌ {error}
        </div>
      )}

      {/* Form to Add Task */}
      <form onSubmit={handleAddTask} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Task Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter task title..."
            style={styles.input}
            disabled={loading}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Status:</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={styles.select}
            disabled={loading}
          >
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Add Task'}
        </button>
      </form>

      {/* Tasks List */}
      <div style={styles.tasksContainer}>
        <h2>Tasks ({tasks.length})</h2>
        
        {tasks.length === 0 ? (
          <p style={styles.noTasks}>No tasks yet. Create one above!</p>
        ) : (
          <ul style={styles.tasksList}>
            {tasks.map(task => (
              <li key={task._id} style={styles.taskItem}>
                <div>
                  <h3>{task.title}</h3>
                  <p>Status: <strong>{task.status}</strong></p>
                  <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div style={styles.taskActions}>
                  <select 
                    value={task.status}
                    onChange={(e) => handleUpdateTask(task._id, e.target.value)}
                    style={styles.statusSelect}
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Complete">Complete</option>
                  </select>
                  
                  <button 
                    onClick={() => handleDeleteTask(task._id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    width: '100%'
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '20px'
  },
  tasksContainer: {
    marginTop: '30px'
  },
  tasksList: {
    listStyle: 'none',
    padding: 0
  },
  taskItem: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  taskActions: {
    display: 'flex',
    gap: '10px'
  },
  statusSelect: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  noTasks: {
    color: '#666',
    fontStyle: 'italic'
  }
};

export default TaskManager;
