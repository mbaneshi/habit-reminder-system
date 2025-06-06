# Habit Reminder System

A personal habit and task management system with Pomodoro timer, built with React, Vite, and Tailwind CSS.

## Features

- 🍅 **Pomodoro Timer**: 25-minute focus sessions with 5-minute breaks
- 💧 **Water Tracking**: Track daily water intake with hourly reminders
- 💊 **Medicine Reminders**: Daily medicine tracking with notifications
- 🚶‍♂️ **Walking Tracker**: Mark daily walks as complete
- 📋 **Priority Tasks**: Add, complete, and delete important tasks
- 🔔 **Smart Notifications**: Automatic reminders for all habits
- 📊 **Progress Dashboard**: Visual overview of daily achievements

## Quick Setup

### Option 1: React + Vite (Recommended)

1. **Create project directory and navigate to it:**
   ```bash
   mkdir habit-reminder-system
   cd habit-reminder-system
   ```

2. **Copy all the provided files into your project directory**

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:3000`

### Option 2: Simple HTML Version

If you want a simple single-file version, create an HTML file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Habit Reminder System</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        // Paste the HabitReminderSystem component here
        // Replace 'lucide-react' imports with window.lucide
    </script>
</body>
</html>
```

## Project Structure

```
habit-reminder-system/
├── src/
│   ├── HabitReminderSystem.jsx  # Main component
│   ├── App.jsx                  # App wrapper
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind CSS imports
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## How to Use

1. **Pomodoro Timer**: Click Start to begin a 25-minute focus session
2. **Water Tracking**: Click "+1 Glass" when you drink water
3. **Medicine**: Click "Mark Taken" when you take your medicine
4. **Walking**: Click "Mark Done" after completing your walk
5. **Tasks**: Add priority tasks and check them off as you complete them
6. **Notifications**: Keep the app open to receive automatic reminders

## Customization

You can easily customize:
- Pomodoro timer durations in `HabitReminderSystem.jsx`
- Water intake targets
- Reminder frequencies
- Notification messages
- Colors and styling via Tailwind classes

## Browser Compatibility

Works in all modern browsers. For the best experience, use:
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Development

This app uses:
- **React 18** for the UI
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

Feel free to modify and extend the functionality as needed!
