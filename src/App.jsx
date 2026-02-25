import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import FocuslyHomepage from "./pages/homepage";
import TasksOverview from "./pages/taskoverview";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FocuslyHomepage />} />
          <Route path="/taskoverview" element={<TasksOverview />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;