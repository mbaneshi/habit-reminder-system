import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, Square, Droplets, Pill, Footprints, CheckCircle, Plus, Trash2, AlertCircle } from 'lucide-react';

const HabitReminderSystem = () => {
  // Pomodoro Timer State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  
  // Habit Tracking State
  const [habits, setHabits] = useState({
    water: { count: 0, target: 8, lastTime: null, interval: 60 }, // every hour
    medicine: { taken: false, time: null, reminder: true },
    walking: { done: false, time: null, target: 30 }, // 30 minutes
  });
  
  // Priority Tasks State
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  
  // Notifications State
  const [notifications, setNotifications] = useState([]);
  
  const timerRef = useRef(null);
  const habitTimerRef = useRef(null);

  // Pomodoro Timer Effect
  useEffect(() => {
    if (isActive && pomodoroTime > 0) {
      timerRef.current = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      // Timer finished
      setIsActive(false);
      if (isBreak) {
        setIsBreak(false);
        setPomodoroTime(25 * 60); // Back to work
        addNotification('Break over! Time to focus 🎯', 'success');
      } else {
        setPomodoroCount(count => count + 1);
        setIsBreak(true);
        setPomodoroTime(5 * 60); // 5 minute break
        addNotification('Pomodoro complete! Take a break 🎉', 'success');
      }
    }
    
    return () => clearInterval(timerRef.current);
  }, [isActive, pomodoroTime, isBreak]);

  // Habit Reminder System
  useEffect(() => {
    habitTimerRef.current = setInterval(() => {
      const now = new Date();
      
      // Water reminder (every hour)
      if (habits.water.lastTime) {
        const lastWater = new Date(habits.water.lastTime);
        const hoursSince = (now - lastWater) / (1000 * 60 * 60);
        if (hoursSince >= 1) {
          addNotification('Time to drink water! 💧', 'info');
        }
      }
      
      // Medicine reminder (if not taken today)
      if (!habits.medicine.taken) {
        const reminderHour = 9; // 9 AM reminder
        if (now.getHours() === reminderHour && now.getMinutes() === 0) {
          addNotification('Don\'t forget your medicine! 💊', 'warning');
        }
      }
      
      // Walking reminder (if not done and it's daytime)
      if (!habits.walking.done && now.getHours() >= 10 && now.getHours() <= 18) {
        const randomReminder = Math.random() < 0.001; // Small chance each check
        if (randomReminder) {
          addNotification('How about a walk? Your body will thank you! 🚶‍♂️', 'info');
        }
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(habitTimerRef.current);
  }, [habits]);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, time: new Date() }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startPauseTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setPomodoroTime(25 * 60);
  };

  const updateHabit = (habitName, updates) => {
    setHabits(prev => ({
      ...prev,
      [habitName]: { ...prev[habitName], ...updates }
    }));
  };

  const drinkWater = () => {
    updateHabit('water', {
      count: habits.water.count + 1,
      lastTime: new Date().toISOString()
    });
    addNotification('Great! Water logged 💧', 'success');
  };

  const takeMedicine = () => {
    updateHabit('medicine', {
      taken: true,
      time: new Date().toISOString()
    });
    addNotification('Medicine taken! ✅', 'success');
  };

  const completeWalk = () => {
    updateHabit('walking', {
      done: true,
      time: new Date().toISOString()
    });
    addNotification('Walk completed! Great job! 🎉', 'success');
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks(prev => [...prev, {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: 'medium',
        createdAt: new Date()
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getMotivationalMessage = () => {
    const messages = [
      "You're doing great! Keep it up! 🌟",
      "Small steps lead to big changes! 💪",
      "Your future self will thank you! 🚀",
      "Progress, not perfection! ✨",
      "Every habit counts! 🎯"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Personal Habit System</h1>
        <p className="text-gray-600">{getMotivationalMessage()}</p>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg shadow-lg max-w-sm ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'warning' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span className="text-sm">{notification.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pomodoro Timer */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="text-red-500" />
            Pomodoro Timer
          </h2>
          
          <div className="text-center">
            <div className={`text-6xl font-mono mb-4 ${isBreak ? 'text-green-500' : 'text-red-500'}`}>
              {formatTime(pomodoroTime)}
            </div>
            
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                isBreak ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isBreak ? 'Break Time' : 'Focus Time'}
              </span>
            </div>
            
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={startPauseTimer}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                } text-white transition-colors`}
              >
                {isActive ? <Pause size={16} /> : <Play size={16} />}
                {isActive ? 'Pause' : 'Start'}
              </button>
              
              <button
                onClick={resetTimer}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Square size={16} />
                Reset
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              Pomodoros completed today: {pomodoroCount}
            </div>
          </div>
        </div>

        {/* Habit Tracker */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Daily Habits</h2>
          
          <div className="space-y-4">
            {/* Water Intake */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Droplets className="text-blue-500" />
                <div>
                  <div className="font-medium">Water Intake</div>
                  <div className="text-sm text-gray-600">
                    {habits.water.count}/{habits.water.target} glasses
                  </div>
                </div>
              </div>
              <button
                onClick={drinkWater}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
              >
                +1 Glass
              </button>
            </div>

            {/* Medicine */}
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Pill className="text-purple-500" />
                <div>
                  <div className="font-medium">Medicine</div>
                  <div className="text-sm text-gray-600">
                    {habits.medicine.taken ? 'Taken ✅' : 'Not taken yet'}
                  </div>
                </div>
              </div>
              {!habits.medicine.taken && (
                <button
                  onClick={takeMedicine}
                  className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
                >
                  Mark Taken
                </button>
              )}
            </div>

            {/* Walking */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Footprints className="text-green-500" />
                <div>
                  <div className="font-medium">Walking</div>
                  <div className="text-sm text-gray-600">
                    {habits.walking.done ? 'Completed ✅' : 'Not done yet'}
                  </div>
                </div>
              </div>
              {!habits.walking.done && (
                <button
                  onClick={completeWalk}
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                >
                  Mark Done
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Priority Tasks</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a priority task..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTask}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          
          <div className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No tasks yet. Add your first priority task above!</p>
            ) : (
              tasks.map(task => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 border rounded-lg ${
                    task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 ${
                      task.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                    }`}
                  >
                    <CheckCircle size={20} />
                  </button>
                  
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-600 flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Today's Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-500">{pomodoroCount}</div>
            <div className="text-sm text-gray-600">Pomodoros</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-500">{habits.water.count}</div>
            <div className="text-sm text-gray-600">Glasses of Water</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-500">{habits.medicine.taken ? '✅' : '❌'}</div>
            <div className="text-sm text-gray-600">Medicine</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-500">{habits.walking.done ? '✅' : '❌'}</div>
            <div className="text-sm text-gray-600">Walking</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitReminderSystem;
