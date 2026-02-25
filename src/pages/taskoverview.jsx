import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/header';
import { useTheme } from '../context/ThemeContext';

const GridDots = ({ isDark }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    style={{ opacity: isDark ? 0.25 : 0.15 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#22C55E" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const TasksOverview = () => {
  const { isDark } = useTheme();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', category: 'work', status: 'pending' });

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('focuslyTasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        const initialTasks = [
          { id: 1, title: "Build Focusly dashboard", category: "Work", status: "pending", date: "Feb 25" },
          { id: 2, title: "Review React patterns", category: "Study", status: "completed", date: "Feb 24" },
          { id: 3, title: "Morning workout", category: "Personal", status: "pending", date: "Feb 26" },
          { id: 4, title: "Deploy to Vercel", category: "Work", status: "pending", date: "Feb 26" },
          { id: 5, title: "Numerical methods assignment", category: "Study", status: "completed", date: "Feb 25" },
        ];
        setTasks(initialTasks);
        localStorage.setItem('focuslyTasks', JSON.stringify(initialTasks));
      }
    } catch (error) {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('focuslyTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'active') return task.status === 'pending';
    return task.category.toLowerCase() === filter;
  });

  const getCategoryColor = (category) => {
    const colors = {
      work: 'bg-blue-500/20 border-blue-500 text-blue-300',
      study: 'bg-indigo-500/20 border-indigo-500 text-indigo-300',
      personal: 'bg-green-500/20 border-green-500 text-green-300',
    };
    return colors[category.toLowerCase()] || 'bg-gray-500/20 border-gray-500 text-gray-300';
  };

  const getCategoryDisplayName = (category) => {
    const names = { work: 'Work', study: 'Study', personal: 'Personal' };
    return names[category.toLowerCase()] || category;
  };

  const toastStyle = (borderColor) => ({
    style: {
      background: isDark ? '#111827' : '#ffffff',
      color: isDark ? '#F9FAFB' : '#111827',
      borderLeft: `4px solid ${borderColor}`,
    }
  });

  const markComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: 'completed' } : task));
    toast.success('Task marked as completed ✅', toastStyle('#22C55E'));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast('Task removed 🗑️', toastStyle('#EF4444'));
  };

  const createTask = () => {
    const taskData = {
      id: Date.now(),
      title: newTask.title.trim(),
      category: newTask.category,
      status: newTask.status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    if (!taskData.title) {
      toast.error('Task title is required!', toastStyle('#EF4444'));
      return;
    }
    setTasks([taskData, ...tasks]);
    setNewTask({ title: '', category: 'work', status: 'pending' });
    setShowCreateModal(false);
    toast.success('Task created successfully ✅', toastStyle('#22C55E'));
  };

  const categoryFilters = ['all', 'work', 'study', 'personal', 'active', 'completed'];

  const bg = isDark
    ? "linear-gradient(to bottom, #0f172a, #020617, #0f172a)"
    : "linear-gradient(to bottom, #f8fafc, #f1f5f9, #f8fafc)";

  const cardBg = isDark ? "rgba(30,41,59,0.5)" : "rgba(255,255,255,0.8)";
  const cardBorder = isDark ? "rgba(51,65,85,0.5)" : "rgba(203,213,225,0.8)";
  const textPrimary = isDark ? "#f1f5f9" : "#0f172a";
  const textSecondary = isDark ? "#94a3b8" : "#475569";
  const filterActiveBg = "rgba(34,197,94,0.15)";
  const filterInactiveBg = isDark ? "rgba(30,41,59,0.5)" : "rgba(241,245,249,0.8)";
  const filterInactiveBorder = isDark ? "rgba(71,85,105,0.5)" : "rgba(203,213,225,0.8)";
  const modalBg = isDark ? "rgba(30,41,59,0.95)" : "rgba(255,255,255,0.98)";
  const inputBg = isDark ? "rgba(51,65,85,0.5)" : "rgba(241,245,249,0.8)";
  const inputBorder = isDark ? "#475569" : "#cbd5e1";

  return (
    <div
      className="min-h-screen relative transition-colors duration-300"
      style={{ background: bg, color: textPrimary }}
    >
      <GridDots isDark={isDark} />
      <Toaster position="top-right" />

      {/* Header with buttons passed as children */}
      <Header>
        <motion.button
          className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
          style={{
            backgroundColor: isDark ? "rgba(30,41,59,0.5)" : "rgba(241,245,249,0.8)",
            borderColor: isDark ? "#475569" : "#cbd5e1",
            color: textPrimary,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.history.back()}
        >
          ← Back
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold rounded-lg shadow-lg transition-all duration-300 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
        >
          + New Task
        </motion.button>
      </Header>

      <main className="relative z-10 pt-24 pb-12 max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            key={isDark ? "dark-heading" : "light-heading"}
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={isDark ? {
              background: "linear-gradient(to right, #f1f5f9, #ffffff, #cbd5e1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            } : {
              color: "#0f172a",
            }}
          >
            Your Tasks Overview
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: textSecondary }}>
            Track everything in one focused place.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categoryFilters.map((cat) => (
            <motion.button
              key={cat}
              className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
              style={{
                backgroundColor: filter === cat ? filterActiveBg : filterInactiveBg,
                borderColor: filter === cat ? "#22c55e" : filterInactiveBorder,
                borderWidth: filter === cat ? "2px" : "1px",
                color: filter === cat ? "#22c55e" : textSecondary,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Tasks */}
        <div className="grid gap-6 max-w-2xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                className="group rounded-2xl p-8 transition-all duration-300 shadow-xl"
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                  opacity: task.status === 'completed' ? 0.6 : 1,
                }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: task.status === 'completed' ? 0.6 : 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: 100 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, type: "spring" }}
                layout
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(task.category)}`}>
                    {getCategoryDisplayName(task.category)}
                  </span>
                  {task.status === 'completed' && (
                    <div className="w-6 h-6 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center text-green-400 text-sm font-bold">
                      ✓
                    </div>
                  )}
                </div>

                <h3
                  className={`text-2xl font-bold mb-3 leading-tight pr-12 ${task.status === 'completed' ? 'line-through opacity-70' : ''}`}
                  style={{ color: textPrimary }}
                >
                  {task.title}
                </h3>

                <p className="text-sm mb-6" style={{ color: textSecondary }}>Created {task.date}</p>

                <div className="flex gap-3">
                  {task.status === 'pending' && (
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => markComplete(task.id)}
                    >
                      Mark Complete
                    </motion.button>
                  )}
                  <motion.button
                    className="p-3 rounded-xl border transition-all duration-300"
                    style={{ backgroundColor: isDark ? "rgba(51,65,85,0.5)" : "rgba(241,245,249,0.8)", borderColor: inputBorder }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteTask(task.id)}
                  >
                    <svg className="w-5 h-5" style={{ color: textSecondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTasks.length === 0 && (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <svg className="w-12 h-12" style={{ color: textSecondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: textPrimary }}>No tasks match this filter</h3>
              <p style={{ color: textSecondary }}>Try adjusting your filter or add new tasks</p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Create Task Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              className="rounded-3xl p-8 max-w-md w-full shadow-2xl"
              style={{ backgroundColor: modalBg, border: `1px solid ${cardBorder}` }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>Create New Task</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: textSecondary }}>Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500/30 focus:outline-none transition-all duration-200"
                    style={{ backgroundColor: inputBg, border: `1px solid ${inputBorder}`, color: textPrimary }}
                    placeholder="What needs to get done?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: textSecondary }}>Category</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500/30 focus:outline-none transition-all duration-200"
                    style={{ backgroundColor: inputBg, border: `1px solid ${inputBorder}`, color: textPrimary }}
                  >
                    <option value="work">Work</option>
                    <option value="study">Study</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={createTask}
                >
                  Create Task
                </motion.button>
                <motion.button
                  className="px-6 py-3 rounded-xl transition-all duration-200"
                  style={{ backgroundColor: inputBg, border: `1px solid ${inputBorder}`, color: textSecondary }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksOverview;