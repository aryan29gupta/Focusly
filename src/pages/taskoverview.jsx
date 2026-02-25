    import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import toast, { Toaster } from 'react-hot-toast';

    const GridDots = () => (
    <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.25 }}
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
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        category: 'work',
        status: 'pending'
    });

    // 🔄 FIXED: Load tasks from localStorage on mount & refresh
    useEffect(() => {
        try {
        const savedTasks = localStorage.getItem('focuslyTasks');
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            setTasks(parsedTasks);
        } else {
            // Initialize with sample data
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
        console.error('Failed to load tasks:', error);
        // Fallback to empty array
        setTasks([]);
        }
    }, []); // Empty dependency array = runs ONCE on mount/refresh

    // 💾 FIXED: Save tasks to localStorage EVERY time tasks change
    useEffect(() => {
        try {
        localStorage.setItem('focuslyTasks', JSON.stringify(tasks));
        } catch (error) {
        console.error('Failed to save tasks:', error);
        }
    }, [tasks]); // Runs whenever 'tasks' array changes (create/delete/complete)

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.status === 'completed';
        if (filter === 'active') return task.status === 'pending';
        return task.category.toLowerCase() === filter;
    });

    const getCategoryColor = (category) => {
        const colors = {
        work: 'bg-blue-500/20 border-blue-500 text-blue-300 ring-blue-500/30',
        study: 'bg-indigo-500/20 border-indigo-500 text-indigo-300 ring-indigo-500/30',
        personal: 'bg-green-500/20 border-green-500 text-green-300 ring-green-500/30',
        };
        return colors[category.toLowerCase()] || 'bg-gray-500/20 border-gray-500 text-gray-300';
    };

    const getCategoryDisplayName = (category) => {
        const names = {
        work: 'Work',
        study: 'Study',
        personal: 'Personal'
        };
        return names[category.toLowerCase()] || category;
    };

    const markComplete = (id) => {
        setTasks(tasks.map(task => 
        task.id === id ? { ...task, status: 'completed' } : task
        ));
        toast.success('Task marked as completed ✅', {
        style: {
            background: '#111827',
            color: '#F9FAFB',
            borderLeft: '4px solid #22C55E'
        }
        });
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        toast('Task removed 🗑️', {
        style: {
            background: '#111827',
            color: '#F9FAFB',
            borderLeft: '4px solid #EF4444'
        }
        });
    };

    const createTask = () => {
        const taskData = {
        id: Date.now(),
        title: newTask.title.trim(),
        category: newTask.category,
        status: newTask.status,
        date: new Date().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        })
        };

        if (!taskData.title) {
        toast.error('Task title is required!', {
            style: {
            background: '#111827',
            color: '#F9FAFB',
            borderLeft: '4px solid #EF4444'
            }
        });
        return;
        }

        setTasks([taskData, ...tasks]); // Add to top
        setNewTask({ title: '', category: 'work', status: 'pending' });
        setShowCreateModal(false);
        
        toast.success('Task created successfully ✅', {
        style: {
            background: '#111827',
            color: '#F9FAFB',
            borderLeft: '4px solid #22C55E'
        }
        });
    };

    const categoryFilters = ['all', 'work', 'study', 'personal', 'active', 'completed'];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-gray-100 relative">
        {/* Green dotted background */}
        <GridDots />

        <Toaster position="top-right" />
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800/50">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-black font-bold text-sm mr-3 shadow-lg">
                ⚡
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                Focusly
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <motion.button 
                className="px-6 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.history.back()}
                >
                ← Back to Dashboard
                </motion.button>
                <motion.button 
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold rounded-lg shadow-lg hover:shadow-green-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateModal(true)}
                >
                + New Task
                </motion.button>
            </div>
            </nav>
        </header>

        {/* Page Title */}
        <main className="relative z-10 pt-24 pb-12 max-w-4xl mx-auto px-6">
            <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-100 via-white to-gray-300 bg-clip-text text-transparent mb-4 leading-tight">
                Your Tasks Overview
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Track everything in one focused place.
            </p>
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categoryFilters.map((cat) => (
                <motion.button
                key={cat}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === cat
                    ? 'bg-green-500/20 border-2 border-green-500 text-green-300 shadow-lg shadow-green-500/20'
                    : 'bg-slate-800/50 border border-slate-600/50 hover:border-slate-500/50 text-gray-300 hover:bg-slate-700/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilter(cat)}
                >
                {cat === 'active' ? 'Active' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
            ))}
            </div>

            {/* Tasks Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-2xl mx-auto">
            <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => (
                <motion.div
                    key={task.id}
                    className={`group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-green-500/10 ${
                    task.status === 'completed' ? 'opacity-60' : ''
                    }`}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: 100 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, type: "spring" }}
                    layout
                >
                    <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
                        {getCategoryDisplayName(task.category)}
                    </span>
                    {task.status === 'completed' && (
                        <div className="w-6 h-6 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center text-green-400 text-sm font-bold">
                        ✓
                        </div>
                    )}
                    </div>

                    <h3 className={`text-2xl font-bold mb-3 leading-tight pr-12 ${
                    task.status === 'completed' ? 'line-through opacity-70' : ''
                    }`}>
                    {task.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-6">Created {task.date}</p>

                    <div className="flex gap-3">
                    {task.status === 'pending' && (
                        <motion.button
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-green-500/40 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => markComplete(task.id)}
                        >
                        Mark Complete
                        </motion.button>
                    )}
                    
                    <motion.button
                        className="p-3 bg-slate-700/50 hover:bg-red-500/20 hover:border-red-500/50 border border-slate-600/50 hover:border-red-400 rounded-xl transition-all duration-300 group-hover:scale-110"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteTask(task.id)}
                    >
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </motion.button>
                    </div>
                </motion.div>
                ))}
            </AnimatePresence>
            
            {filteredTasks.length === 0 && (
                <motion.div 
                className="col-span-full text-center py-24"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                >
                <div className="w-24 h-24 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">No tasks match this filter</h3>
                <p className="text-gray-500">Try adjusting your filter or add new tasks</p>
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
                className="bg-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                >
                <h3 className="text-2xl font-bold text-gray-100 mb-6">Create New Task</h3>
                
                <div className="space-y-4 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
                    <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none transition-all duration-200"
                        placeholder="What needs to get done?"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                        value={newTask.category}
                        onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none transition-all duration-200"
                    >
                        <option value="work">Work</option>
                        <option value="study">Study</option>
                        <option value="personal">Personal</option>
                    </select>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <motion.button
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-green-500/40 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={createTask}
                    >
                    Create Task
                    </motion.button>
                    <motion.button
                    className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-gray-300 hover:text-gray-100 transition-all duration-200"
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
