import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import AssignedTasksPage from './pages/AssignedTasksPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/tasks" element={<TaskPage />} />
                    <Route path="/assigned-tasks" element={<AssignedTasksPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
