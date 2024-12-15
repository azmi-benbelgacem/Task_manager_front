import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importation de useNavigate
import { getUsers, getProjects, getTasks } from '../services/Api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faProjectDiagram, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const AssignedTasksPage = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();  // Initialisation de navigate

    // Récupérer les utilisateurs, projets et tâches assignées à partir de l'API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                const projectsData = await getProjects();
                const tasksData = await getTasks();
                setUsers(usersData);
                setProjects(projectsData);
                setTasks(tasksData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Fonction pour rediriger vers la page d'accueil
    const handleGoHome = () => {
        navigate("/");  // Redirection vers la page d'accueil
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-100 via-sky-200 to-sky-50 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-sky-950 shadow-lg border-b-4 border-sky-500 pb-2">
                    Assigned Tasks
                </h1>
                {/* Bouton pour retourner à la page d'accueil */}
                <button
                    onClick={handleGoHome}
                    className="flex items-center py-2 px-4 bg-sky-950 text-white font-semibold rounded-md hover:bg-sky-800">
                    Go to Home
                </button>
            </div>

            {/* Tasks Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {tasks.map((task) => (
                    <div key={task.id}
                         className={`card w-full shadow-xl rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${task.completed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        <div className="card-body p-4">
                            <h2 className="card-title text-xl text-sky-950">
                                <span className="font-semibold">Task title: </span>{task.title}
                            </h2>
                            <p className="text-gray-700 mb-4">
                                <span className="font-semibold">Task description: </span>{task.description}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span className="flex items-center">
                                    <FontAwesomeIcon className="mr-2 text-sky-600" icon={faUser} />
                                    <span className="font-semibold">Assigned User:</span>
                                    {users.find((user) => user.id === task.user_id)?.username || 'No user assigned'}
                                </span>
                                <span className="flex items-center">
                                    <FontAwesomeIcon className="mr-2 text-sky-600" icon={faProjectDiagram} />
                                    <span className="font-semibold">Project:</span>
                                    {projects.find((project) => project.id === task.project_id)?.name || 'No project assigned'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className={`text-sm ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                                    <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
                                    <span className="font-semibold">Task Status:</span>
                                    {task.completed ? 'Completed' : 'Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Users Display */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-sky-950 mb-4">Employees</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
                    {users.map((user) => (
                        <div key={user.id} className="card bg-white shadow-xl rounded-lg transition transform hover:scale-105 hover:shadow-2xl duration-300">
                            <div className="card-body">
                                <h3 className="card-title mt-1 ml-2 text-lg text-sky-950">
                                    <span className="font-semibold">Employee: </span>{user.username}
                                </h3>
                                <p className="text-gray-500 mb-2 ml-2 text-sm">
                                    <span className="font-semibold">Email: </span>{user.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Projects Display */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-sky-950 mb-4">Projects</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="card bg-white shadow-xl rounded-lg transition transform hover:scale-105 hover:shadow-2xl duration-300">
                            <div className="card-body">
                                <h3 className="card-title text-lg t-1 ml-2  text-sky-950">
                                    <span className="font-semibold">Title: </span>{project.name}
                                </h3>
                                <p className="text-gray-500 mb-2 ml-2 text-sm">
                                    <span className="font-semibold">Description: </span>{project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssignedTasksPage;
