# ⚡ Focusly

A clean, distraction-free task management app built with React. Organize your work, study, and personal tasks — all in one place.

🔗 **Live Demo:** [focusly-five.vercel.app](https://focusly-five.vercel.app)

---

## 📸 Screenshots

### 🌙 Dark Mode — Homepage
![Focusly Homepage Dark](./images/homepage-dark.png)

### ☀️ Light Mode — Homepage
![Focusly Homepage Light](./images/homepage-light.png)

### 📋 Tasks Overview — Light Mode
![Tasks Overview Light](./images/tasks-light.png)

### ✅ Task Created — Dark Mode
![Task Created](./images/task-created.png)

### ✔️ Completed Tasks — Dark Mode
![Completed Tasks](./images/tasks-completed.png)

---

## ✨ Features

- **Task Management** — Create, complete, and delete tasks
- **Categories** — Organize tasks by Work, Study, or Personal
- **Filter System** — Filter by category, active, or completed
- **Dark / Light Mode** — Smooth toggle with persistence across sessions
- **Local Storage** — Tasks and theme preference saved in the browser
- **No Flash on Reload** — Theme is set before React mounts to avoid flicker
- **Fully Responsive** — Works on desktop and mobile
- **Smooth Animations** — Powered by Framer Motion

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Framer Motion | Animations |
| Tailwind CSS | Styling |
| react-hot-toast | Toast notifications |
| localStorage | Data persistence |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/focusly.git
cd focusly

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   └── header.jsx          # Shared header with theme toggle
├── context/
│   └── ThemeContext.jsx     # Global dark/light theme state
├── pages/
│   ├── homepage.jsx         # Landing page
│   └── taskoverview.jsx     # Task management page
├── App.jsx                  # Routes
└── main.jsx                 # Entry point
```

---

## 🌐 Deployment

This project is deployed on **Vercel**. The `vercel.json` handles client-side routing so page refreshes work correctly:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📄 License

MIT — feel free to use and modify.