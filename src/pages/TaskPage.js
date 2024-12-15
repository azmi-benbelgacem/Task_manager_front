// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// import {
//     fetchProjects,
//     createProject,
//     updateProject,
//     deleteProject,
//     createTask,
//     updateTask,
//     deleteTask,
//     toggleTaskCompletion,
// } from "../services/Api"; // Import des fonctions de votre fichier api.js
//
// const TaskPage = ({ employees, handleLogout }) => {
//     // États pour la gestion des projets
//     const [projects, setProjects] = useState(() => {
//         const initialProjects = [
//             { id: 1, name: 'Projet Exemple', tasks: [] },
//         ];
//         console.log('Initial Projects:', initialProjects);
//         return initialProjects;
//     });
//
//     const [filteredProjects, setFilteredProjects] = useState([]);
//     const [newProjectName, setNewProjectName] = useState("");
//     const [newProjectDescription, setNewProjectDescription] = useState("");
//     const [editingProject, setEditingProject] = useState(null);
//
//     // États pour la gestion des tâches
//     const [tasks, setTasks] = useState([]);
//     const [newTaskTitle, setNewTaskTitle] = useState("");
//     const [newTaskDescription, setNewTaskDescription] = useState("");
//     const [newTaskEmployee, setNewTaskEmployee] = useState("");
//     const [editingTask, setEditingTask] = useState(null);
//     const [taskCompleted, setTaskCompleted] = useState(false);
//
//     const [loading, setLoading] = useState(true); // État de chargement
//     // Barre de recherche
//     const [searchQuery, setSearchQuery] = useState("");
//
//
//     // Charger les projets au chargement du composant
//     useEffect(() => {
//         const loadProjects = async () => {
//             try {
//                 const data = await fetchProjects();
//                 console.log('Fetched projects:', data); // Ajout d'un log pour vérifier les données
//
//                 // Vérifiez si `data` est un tableau valide
//                 if (Array.isArray(data)) {
//                     setProjects(data);
//                     setFilteredProjects(data);
//                 } else {
//                     console.error("La réponse de l'API n'est pas un tableau valide :", data);
//                     setProjects([]); // Assurez-vous que projects est un tableau vide si les données ne sont pas valides
//                     setFilteredProjects([]); // Pareil pour filteredProjects
//                 }
//             } catch (error) {
//                 console.error("Erreur lors du chargement des projets :", error);
//                 setProjects([]); // Assurez-vous que projects est un tableau vide en cas d'erreur
//                 setFilteredProjects([]); // Pareil pour filteredProjects
//             }
//         };
//
//         loadProjects();
//     }, []);
//
//
//     // Gestion de la recherche
//     const handleSearch = (e) => {
//         const query = e.target.value.toLowerCase();
//         setSearchQuery(query);
//
//         // Vérifiez si `projects` est défini et est un tableau
//         if (!Array.isArray(projects)) {
//             console.error("Projects is not an array:", projects);
//             return;
//         }
//
//         const filtered = (projects || []).filter((project) => {
//             const tasks = Array.isArray(project.tasks) ? project.tasks : [];
//             return (
//                 project.name.toLowerCase().includes(query) ||
//                 project.description.toLowerCase().includes(query) ||
//                 tasks.some((task) => task.title.toLowerCase().includes(query))
//             );
//         });
//
//         setFilteredProjects(filtered);
//     };
//
//     // Ajouter un projet
//     const handleAddProject = async () => {
//         if (!newProjectName || !newProjectDescription) {
//             console.error("Nom ou description du projet manquant !");
//             return;
//         }
//
//         try {
//             console.log("Données du projet envoyées :", {
//                 name: newProjectName,
//                 description: newProjectDescription,
//             });
//
//             const newProject = await createProject({
//                 name: newProjectName,
//                 description: newProjectDescription,
//             });
//
//             console.log("Projet créé :", newProject);
//
//             setProjects((prevProjects) => [...prevProjects, newProject]);
//             setFilteredProjects((prevFilteredProjects) => [...prevFilteredProjects, newProject]);
//             setNewProjectName("");
//             setNewProjectDescription("");
//         } catch (error) {
//             console.error("Erreur lors de l'ajout du projet :", error);
//         }
//     };
//
//     // Modifier un projet
//     const handleUpdateProject = async () => {
//         if (!newProjectName || !newProjectDescription) return;
//
//         try {
//             const updatedProject = await updateProject(editingProject, {
//                 name: newProjectName,
//                 description: newProjectDescription,
//             }); // Appel API
//
//             const updatedProjects = projects.map((project) =>
//                 project.id === editingProject ? updatedProject : project
//             );
//
//             setProjects(updatedProjects);
//             setFilteredProjects(updatedProjects);
//             setEditingProject(null);
//             setNewProjectName("");
//             setNewProjectDescription("");
//         } catch (error) {
//             console.error("Erreur lors de la modification du projet :", error);
//         }
//     };
//
//     // Supprimer un projet
//     const handleDeleteProject = async (projectId) => {
//         try {
//             await deleteProject(projectId); // Appel API
//             const updatedProjects = projects.filter((project) => project.id !== projectId);
//             setProjects(updatedProjects);
//             setFilteredProjects(updatedProjects);
//         } catch (error) {
//             console.error("Erreur lors de la suppression du projet :", error);
//         }
//     };
//
// // Ajouter une tâche
//     const handleAddTask = async (projectId) => {
//         if (!newTaskTitle || !newTaskDescription || !newTaskEmployee) return;
//
//         try {
//             const newTask = await createTask(projectId, {
//                 title: newTaskTitle,
//                 description: newTaskDescription,
//                 employeeId: newTaskEmployee,
//             });
//
//             const updatedProjects = projects.map((project) =>
//                 project.id === projectId
//                     ? {
//                         ...project,
//                         tasks: Array.isArray(project.tasks) ? [...project.tasks, newTask] : [newTask], // Assurez-vous que tasks est un tableau
//                     }
//                     : project
//             );
//
//             setProjects(updatedProjects);
//             setFilteredProjects(updatedProjects);
//             setNewTaskTitle("");
//             setNewTaskDescription("");
//             setNewTaskEmployee("");
//         } catch (error) {
//             console.error("Erreur lors de l'ajout de la tâche :", error);
//         }
//     };
//
//     // Modifier une tâche
//     const handleUpdateTask = async (projectId, taskId) => {
//         try {
//             const updatedTask = Array.isArray(projects.tasks)
//                 ? projects.tasks.map((task) =>
//                     task.id === taskId ? updatedTask : task
//                 )
//                 : [];
//
//
//             const updatedProjects = projects.map((project) => {
//                 if (project.id === projectId) {
//                     const updatedTasks = project.tasks.map((task) =>
//                         task.id === taskId ? updatedTask : task
//                     );
//                     return { ...project, tasks: updatedTasks };
//                 }
//                 return project;
//             });
//
//             setProjects(updatedProjects);
//             setFilteredProjects(updatedProjects);
//             setEditingTask(null);
//             setNewTaskTitle("");
//             setNewTaskDescription("");
//             setTaskCompleted(false);
//         } catch (error) {
//             console.error("Erreur lors de la modification de la tâche :", error);
//         }
//     };
//
//     // Supprimer une tâche
//     const handleDeleteTask = async (projectId, taskId) => {
//         try {
//             await deleteTask(projectId, taskId); // Appel API
//             const updatedProjects = projects.map((project) => {
//                 if (project.id === projectId) {
//                     const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
//                     return { ...project, tasks: updatedTasks };
//                 }
//                 return project;
//             });
//
//             setProjects(updatedProjects);
//             setFilteredProjects(updatedProjects);
//         } catch (error) {
//             console.error("Erreur lors de la suppression de la tâche :", error);
//         }
//     };
//
//     // Basculer l'état d'achèvement d'une tâche
//     const handleToggleTaskCompletion = async (projectId, taskId) => {
//         try {
//             const updatedTask = await toggleTaskCompletion(projectId, taskId); // Appel API
//
//             const updatedProjects = projects.map((project) => {
//                 if (project.id === projectId) {
//                     const updatedTasks = project.tasks.map((task) =>
//                         task.id === taskId ? updatedTask : task
//                     );
//                     return { ...project, tasks: updatedTasks };
//                 }
//                 return project;
//             });
//
//             setProjects(updatedProjects);
//             setFilteredProjects(updatedProjects);
//         } catch (error) {
//             console.error("Erreur lors du changement d'état de la tâche :", error);
//         }
//     };
//
//     return (
//         <div className="min-h-screen bg-gradient-to-r from-sky-100 via-sky-100 to-sky-50 p-6">
//             {/* Titre */}
//             <div className="flex items-center justify-between mb-4">
//                 {/* Titre à droite */}
//                 <h1 className="text-4xl mb-4 font-bold text-sky-950 shadow-2xl">
//                     Gestionnaire de Projets et Tâches
//                 </h1>
//
//                 {/* Bouton de déconnexion avec icône à gauche du titre */}
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center py-2 px-4 bg-sky-950 text-white font-semibold rounded-md hover:bg-sky-800"
//                 >
//                     <FontAwesomeIcon className="h-5 w-5 mr-2" icon={faSignOutAlt} /> {/* Icône à gauche du texte */}
//                     Se déconnecter
//                 </button>
//             </div>
//             <div>
//                 {/* Barre de Recherche */}
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         className="input input-bordered w-full"
//                         placeholder="Rechercher un projet ou une tâche..."
//                         value={searchQuery}
//                         onChange={handleSearch}
//                     />
//                 </div>
//             </div>
//             {/* Add Project */}
//             <div className="mb-8 bg-white p-6 rounded-lg shadow-xl transition transform hover:scale-100 hover:shadow-2xl duration-300">
//                 <h2 className="text-2xl font-semibold mb-4 text-sky-950">Ajouter un Projet</h2>
//                 <div className="flex space-x-4">
//                     <input
//                         type="text"
//                         className="input input-bordered w-full"
//                         placeholder="Nom du projet"
//                         value={newProjectName}
//                         onChange={(e) => setNewProjectName(e.target.value)}
//                     />
//                     <input
//                         type="text"
//                         className="input input-bordered w-full"
//                         placeholder="Description du projet"
//                         value={newProjectDescription}
//                         onChange={(e) => setNewProjectDescription(e.target.value)}
//                     />
//                     <button className="btn btn-outline btn-success" onClick={handleAddProject}>
//                         Ajouter
//                     </button>
//                 </div>
//             </div>
//
//             {/* Liste des Projets Filtrés */}
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {filteredProjects.length === 0 ? (
//                     <div className="col-span-3 text-center text-xl font-semibold text-gray-500">
//                         Aucun projet trouvé.
//                     </div>
//                 ) : (
//                     filteredProjects.map((project) => (
//                         <div
//                             key={project.id}
//                             className="card shadow-xl bg-white rounded-lg border border-gray-200 transition-transform duration-300 transform hover:scale-100 hover:shadow-2xl"
//                         >
//                             <div className="card-body p-4">
//                                 {/* Project Modification */}
//                                 {editingProject === project.id ? (
//                                     <div className="space-y-4">
//                                         <input
//                                             type="text"
//                                             className="input input-bordered w-full mb-4"
//                                             value={newProjectName}
//                                             onChange={(e) => setNewProjectName(e.target.value)}
//                                         />
//                                         <input
//                                             type="text"
//                                             className="input input-bordered w-full mb-4"
//                                             value={newProjectDescription}
//                                             onChange={(e) => setNewProjectDescription(e.target.value)}
//                                         />
//                                         <div className="flex justify-between items-center mt-4">
//                                             <button
//                                                 className="btn btn-outline btn-success w-1/2 mr-2"
//                                                 onClick={handleUpdateProject}
//                                             >
//                                                 Sauvegarder
//                                             </button>
//                                             <button
//                                                 className="btn btn-outline btn-secondary w-1/2"
//                                                 onClick={() => setEditingProject(null)}
//                                             >
//                                                 Annuler
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <h2 className="card-title text-xl font-semibold text-sky-950">{project.name}</h2>
//                                         <p className="text-gray-600">{project.description}</p>
//                                         <p className="text-xs text-gray-500 mb-4">
//                                             Créé le : {project.createdAt}
//                                         </p>
//                                         <div className="flex justify-between items-center">
//                                             <button
//                                                 className="btn btn-warning btn-sm transition-transform duration-300 transform hover:scale-110"
//                                                 onClick={() => {
//                                                     setEditingProject(project.id);
//                                                     setNewProjectName(project.name);
//                                                     setNewProjectDescription(project.description);
//                                                 }}
//                                             >
//                                                 Modifier
//                                             </button>
//                                             <button
//                                                 className="btn btn-error btn-sm transition-transform duration-300 transform hover:scale-110"
//                                                 onClick={() => handleDeleteProject(project.id)}
//                                             >
//                                                 Supprimer
//                                             </button>
//                                         </div>
//                                     </>
//                                 )}
//
//                                 {/* Tasks List */}
//                                 <div className="mt-4">
//                                     <h3 className="font-medium text-gray-700 mb-2">Tâches :</h3>
//
//                                     <ul className="space-y-2">
//                                         {(project.tasks?.filter((task) =>
//                                             task.title.toLowerCase().includes(searchQuery.toLowerCase())
//                                         ) || []).map((task) => (
//                                             <li
//                                                     key={task.id}
//                                                     className={`flex flex-col p-3 rounded-lg ${
//                                                         task.completed
//                                                             ? "bg-green-100 text-green-800"
//                                                             : "bg-red-100 text-red-800"
//                                                     } transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
//                                                 >
//                                                     {/* Task Modification */}
//                                                     {editingTask === task.id ? (
//                                                         <div className="space-y-4">
//                                                             <input
//                                                                 type="text"
//                                                                 className="input input-bordered w-full mb-4"
//                                                                 value={newTaskTitle}
//                                                                 onChange={(e) => setNewTaskTitle(e.target.value)}
//                                                             />
//                                                             <textarea
//                                                                 className="textarea textarea-bordered w-full mb-4"
//                                                                 value={newTaskDescription}
//                                                                 onChange={(e) => setNewTaskDescription(e.target.value)}
//                                                             />
//                                                             <select
//                                                                 className="select select-bordered w-full mb-4"
//                                                                 value={newTaskEmployee}
//                                                                 onChange={(e) => setNewTaskEmployee(e.target.value)}
//                                                             >
//                                                                 <option value="">Sélectionnez un employé</option>
//                                                                 {employees.map((employee) => (
//                                                                     <option key={employee.id} value={employee.id}>
//                                                                         {employee.name}
//                                                                     </option>
//                                                                 ))}
//                                                             </select>
//
//                                                             <div className="mb-4">
//                                                                 <label className="label cursor-pointer">
//                                                                     <span className="label-text">Terminée ?</span>
//                                                                     <input
//                                                                         type="checkbox"
//                                                                         className="checkbox checkbox-primary"
//                                                                         checked={taskCompleted}
//                                                                         onChange={() =>
//                                                                             setTaskCompleted(!taskCompleted)
//                                                                         }
//                                                                     />
//                                                                 </label>
//                                                             </div>
//
//                                                             <div className="flex justify-between items-center mt-4">
//                                                                 <button
//                                                                     className="btn btn-outline btn-success w-1/2 mr-2"
//                                                                     onClick={() =>
//                                                                         handleUpdateTask(project.id, task.id)
//                                                                     }
//                                                                 >
//                                                                     Sauvegarder
//                                                                 </button>
//                                                                 <button
//                                                                     className="btn btn-outline btn-secondary w-1/2"
//                                                                     onClick={() => setEditingTask(null)}
//                                                                 >
//                                                                     Annuler
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     ) : (
//                                                         <>
//                                                             <div className="flex justify-between items-center">
//                                                                 <span className="font-bold">{task.title}</span>
//                                                                 <button
//                                                                     className="btn btn-sm btn-info"
//                                                                     onClick={() =>
//                                                                         handleToggleTaskCompletion(
//                                                                             project.id,
//                                                                             task.id
//                                                                         )
//                                                                     }
//                                                                 >
//                                                                     {task.completed
//                                                                         ? "Marquer comme non terminé"
//                                                                         : "Marquer comme terminé"}
//                                                                 </button>
//                                                                 <button
//                                                                     className="btn btn-sm btn-error"
//                                                                     onClick={() =>
//                                                                         handleDeleteTask(project.id, task.id)
//                                                                     }
//                                                                 >
//                                                                     Supprimer
//                                                                 </button>
//                                                             </div>
//                                                             <p className="text-sm">{task.description}</p>
//                                                             <p className="text-xs text-gray-500">
//                                                                 Créé le : {task.createdAt}
//                                                             </p>
//                                                             <p className="text-xs text-gray-500">
//                                                                 <strong>Employé :</strong>{" "}
//                                                                 {task.employee?.name || "Non assigné"}
//                                                             </p>
//                                                             <button
//                                                                 className="btn btn-warning btn-sm mt-2"
//                                                                 onClick={() => {
//                                                                     setEditingTask(task.id);
//                                                                     setNewTaskTitle(task.title);
//                                                                     setNewTaskDescription(task.description);
//                                                                     setTaskCompleted(task.completed);
//                                                                 }}
//                                                             >
//                                                                 Modifier
//                                                             </button>
//                                                         </>
//                                                     )}
//                                                 </li>
//                                             ))}
//                                     </ul>
//
//                                     {/* Add Task */}
//                                     <div className="mt-4 flex flex-col space-y-2">
//                                         <input
//                                             type="text"
//                                             className="input input-bordered"
//                                             placeholder="Nom de la tâche"
//                                             value={newTaskTitle}
//                                             onChange={(e) => setNewTaskTitle(e.target.value)}
//                                         />
//                                         <textarea
//                                             className="textarea textarea-bordered w-full mb-2"
//                                             placeholder="Description de la tâche"
//                                             value={newTaskDescription}
//                                             onChange={(e) => setNewTaskDescription(e.target.value)}
//                                         />
//                                         <select
//                                             className="select select-bordered w-full mb-2"
//                                             value={newTaskEmployee}
//                                             onChange={(e) => setNewTaskEmployee(e.target.value)}
//                                         >
//                                             <option value="">Sélectionnez un employé</option>
//                                             {employees.map((employee) => (
//                                                 <option key={employee.id} value={employee.id}>
//                                                     {employee.name}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <button
//                                             className="btn btn-success"
//                                             onClick={() => handleAddTask(project.id)}
//                                         >
//                                             Ajouter Tâche
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
//
//
// };
//
// export default TaskPage;




//
// import React, { useState } from 'react';
// import { createProject, createTask } from '../services/Api'; // Assurez-vous que le chemin d'importation est correct.
//
// const TaskPage = () => {
//     // États pour les données du projet
//     const [projectName, setProjectName] = useState('');
//     const [projectDescription, setProjectDescription] = useState('');
//
//     // États pour les données de la tâche
//     const [taskTitle, setTaskTitle] = useState('');
//     const [taskDescription, setTaskDescription] = useState('');
//
//     // État pour afficher les messages d'erreur ou de succès
//     const [message, setMessage] = useState('');
//
//     // Méthode pour créer un projet
//     const handleCreateProject = async () => {
//         try {
//             // Créer le projet
//             const projectResponse = await createProject(projectName, projectDescription);
//             const projectId = projectResponse.project_id; // Récupérer l'ID du projet créé
//             console.log('Projet créé:', projectResponse);
//
//             // Créer une tâche après la création du projet
//             handleCreateTask(projectId);
//
//             // Réinitialiser les champs du projet
//             setProjectName('');
//             setProjectDescription('');
//         } catch (error) {
//             console.error('Erreur lors de la création du projet:', error);
//             setMessage('Erreur lors de la création du projet');
//         }
//     };
//
//     // Méthode pour créer une tâche liée à un projet
//     const handleCreateTask = async (projectId) => {
//         try {
//             const taskData = {
//                 title: taskTitle,
//                 description: taskDescription,
//                 project_id: projectId, // Lier la tâche au projet créé
//             };
//
//             const taskResponse = await createTask(taskData);
//             console.log('Tâche créée:', taskResponse);
//
//             // Afficher un message de succès
//             setMessage('Projet et tâche créés avec succès!');
//
//             // Réinitialiser les champs de la tâche
//             setTaskTitle('');
//             setTaskDescription('');
//         } catch (error) {
//             console.error('Erreur lors de la création de la tâche:', error);
//             setMessage('Erreur lors de la création de la tâche');
//         }
//     };
//
//     return (
//         <div>
//             <h2>Créer un Nouveau Projet et une Tâche</h2>
//
//             {/* Formulaire de création de projet */}
//             <div>
//                 <h3>Créer un projet</h3>
//                 <input
//                     type="text"
//                     placeholder="Nom du projet"
//                     value={projectName}
//                     onChange={(e) => setProjectName(e.target.value)}
//                 />
//                 <textarea
//                     placeholder="Description du projet"
//                     value={projectDescription}
//                     onChange={(e) => setProjectDescription(e.target.value)}
//                 />
//             </div>
//
//             {/* Formulaire de création de tâche */}
//             <div>
//                 <h3>Créer une tâche</h3>
//                 <input
//                     type="text"
//                     placeholder="Titre de la tâche"
//                     value={taskTitle}
//                     onChange={(e) => setTaskTitle(e.target.value)}
//                 />
//                 <textarea
//                     placeholder="Description de la tâche"
//                     value={taskDescription}
//                     onChange={(e) => setTaskDescription(e.target.value)}
//                 />
//
//             </div>
//
//             <button onClick={handleCreateProject}>Créer Projet</button>
//             <button onClick={() => handleCreateTask()}>Créer Tâche</button>
//
//             {/* Afficher un message de succès ou d'erreur */}
//             {message && <p>{message}</p>}
//         </div>
//     );
// };
//
// export default TaskPage;








import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createUser, getUsers, getUserByUsername ,updateUser ,deleteUser} from '../services/Api';
import { createProject, getProjects, updateProject, deleteProject } from '../services/Api';
import { createTask, getTasks, updateTask, deleteTask } from '../services/Api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


const TaskPage = () => {
    // États pour les données
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    // Récupérer les utilisateurs et les projets à partir de l'API
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

    const navigate = useNavigate();

    // Check if the user is authenticated
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (!isAuthenticated) {
            navigate("/"); // Redirect to login page if not authenticated
        }
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // Remove authentication flag
        navigate("/"); // Redirect to login page
    };


    const handleCreateUser = async () => {
        try {
            const user = await createUser(newUser.username, newUser.email, newUser.password);
            setUsers([...users, user]);
            setNewUser({ username: '', email: '', password: '' });
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleGetUsers = async () => {
        try {
            const usersData = await getUsers();
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleGetUserByUsername = async (username) => {
        try {
            const user = await getUserByUsername(username);
            console.log("User found:", user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        name: '',
        description: ''
    });

    const handleUpdateUser = async (id) => {
        const updatedUsername = prompt("Enter new username:");
        const updatedEmail = prompt("Enter new email:");
        const updatedPassword = prompt("Enter new password (leave empty to keep the current password):");

        if (!updatedUsername || !updatedEmail) {
            alert("Username and email are required!");
            return;
        }

        try {
            const response = await updateUser(id, {
                username: updatedUsername,
                email: updatedEmail,
                password: updatedPassword || undefined,
            });

            if (response.message) {
                alert(response.message);
                // Met à jour la liste des utilisateurs
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === id
                            ? { ...user, username: updatedUsername, email: updatedEmail }
                            : user
                    )
                );
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user. Please try again.");
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            const response = await deleteUser(id);

            if (response.message) {
                alert(response.message);
                // Supprime l'utilisateur de la liste
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again.");
        }
    };


    const handleCreateProject = async () => {
        try {
            const project = await createProject(newProject.name, newProject.description);
            setProjects([...projects, project]);
            setNewProject({ name: '', description: '' });
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    const handleGetProjects = async () => {
        try {
            const projectsData = await getProjects();
            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleUpdateProject = async (id, name, description) => {
        const newName = prompt("Enter the new project name:", name);
        const newDescription = prompt("Enter the new project description:", description);

        if (!newName || !newDescription) {
            alert("Project name and description are required!");
            return;
        }

        try {
            const updatedProject = await updateProject(id, { name: newName, description: newDescription });
            alert("Project updated successfully!");
            setProjects((prevProjects) =>
                prevProjects.map((project) => (project.id === id ? updatedProject : project))
            );
        } catch (error) {
            console.error("Error updating project:", error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.error || "Unknown server error"}`);
            } else {
                alert("Failed to update project. Please try again.");
            }
        }
    };


    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(id);
            setProjects(projects.filter(project => project.id !== id));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        user_id: '',
        project_id: ''
    });

    // Handler pour la création de tâche
    const handleCreateTask = async () => {
        try {
            const task = await createTask(
                newTask.title,
                newTask.description,
                newTask.user_id,
                newTask.project_id
            );
            setTasks([...tasks, task]);
            setNewTask({
                title: '',
                description: '',
                user_id: '',
                project_id: ''
            });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleGetTasks = async () => {
        try {
            const tasksData = await getTasks();
            setTasks(tasksData);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleUpdateTask = async (id, title, description, completed) => {
        try {
            const updatedTask = await updateTask(id, title, description, completed);
            setTasks(tasks.map(task => task.id === id ? updatedTask : task));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Gérer la modification de l'état de la nouvelle tâche
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-100 via-sky-100 to-sky-50 p-6">
            {/* Titre */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl mb-4 font-bold text-sky-950 shadow-lg border-b-4 border-sky-500 pb-2">
                    Task Management
                </h1>
                {/* Bouton de déconnexion avec icône à gauche du titre */}
                <button
                    onClick={handleLogout}
                    className="flex items-center py-2 px-4 bg-sky-950 text-white font-semibold rounded-md hover:bg-sky-800">
                    <FontAwesomeIcon className="h-5 w-5 mr-2" icon={faSignOutAlt} /> {/* Icône à gauche du texte */}
                    Disconnect
                </button>
            </div>

            {/* Create User Form */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-xl transition transform hover:scale-100 hover:shadow-2xl duration-300">
                <h2 className="text-2xl font-semibold mb-4 text-sky-950">Create Employee</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        className="input input-bordered w-full border-2 border-sky-300 focus:ring focus:ring-sky-200"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        placeholder="Employee"
                    />
                    <input
                        type="email"
                        className="input input-bordered w-full border-2 border-sky-300 focus:ring focus:ring-sky-200"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        className="input input-bordered w-full border-2 border-sky-300 focus:ring focus:ring-sky-200"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        placeholder="Password"
                    />
                    <button
                        className="btn bg-sky-600 text-white border-none hover:bg-sky-500 hover:shadow-md transition duration-300"
                        onClick={handleCreateUser}
                    >
                        Create Employee
                    </button>
                </div>
            </div>

            {/* User List */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-sky-950 mb-4">Employee List</h3>
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="flex justify-between items-center text-lg text-gray-700 bg-white p-4 rounded-md shadow-md hover:shadow-lg transition"
                        >
                            <span>{user.username} - {user.email}</span>
                            <div>
                                <button
                                    onClick={() => handleUpdateUser(user.id)}
                                    className=" items-center mr-2 bg-sky-950 text-white shadow-md font-semibold hover:bg-sky-800"
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-error btn-sm border border-sky-300 hover:border-sky-950 shadow-md hover:shadow-lg"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Create Project Form */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-xl transition transform hover:scale-100 hover:shadow-2xl duration-300">
                <h2 className="text-2xl font-semibold mb-4 text-sky-950">Create Project</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        className="input input-bordered w-full border-2 border-sky-300 focus:ring focus:ring-sky-200"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        placeholder="Project Name"
                    />
                    <textarea
                        className="textarea textarea-bordered w-full border-2 border-sky-300 focus:ring focus:ring-sky-200"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        placeholder="Project Description"
                    />
                    <button
                        className="btn bg-sky-600 text-white border-none hover:bg-sky-500 hover:shadow-md transition duration-300"
                        onClick={handleCreateProject}
                    >
                        Create Project
                    </button>
                </div>
            </div>

            {/* Project List */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-sky-950 mb-4">Project List</h3>
                <ul className="space-y-2">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            className="flex justify-between items-center text-lg text-gray-700 bg-white p-4 rounded-md shadow-md hover:shadow-lg transition"
                        >
                            <span>{project.name} - {project.description}</span>
                            <div>
                                <button
                                    onClick={() => handleUpdateProject(project.id)}
                                    className=" items-center mr-2 bg-sky-950 text-white shadow-md font-semibold hover:bg-sky-800"
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-error btn-sm border border-sky-300 hover:border-sky-950 shadow-md hover:shadow-lg"
                                    onClick={() => handleDeleteProject(project.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Create Task Form */}
            <div
                className="mb-8 bg-white p-6 rounded-lg shadow-xl transition transform hover:scale-100 hover:shadow-2xl duration-300">
                <h2 className="text-2xl font-semibold mb-4 text-sky-950">Create Task</h2>
                <div className="space-y-4">
                    <select
                        className="select select-bordered w-full border-2 border-sky-300 focus:ring focus:ring-sky-200"
                        value={newTask.project_id}
                        onChange={(e) => setNewTask({...newTask, project_id: e.target.value})}
                    >
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="select select-bordered w-full border-2 border-sky-300 focus:ring focus:ring-sky-200"
                        value={newTask.user_id}
                        onChange={(e) => setNewTask({ ...newTask, user_id: e.target.value })}
                    >
                        <option value="">Assign Employee</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        className="input input-bordered w-full border-2 border-sky-300 focus:ring focus:ring-sky-200"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Task Title"
                    />
                    <textarea
                        className="textarea textarea-bordered w-full border-2 border-sky-300 focus:ring focus:ring-sky-200"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="Task Description"
                    />
                    <button
                        className="btn bg-sky-600 text-white border-none hover:bg-sky-500 hover:shadow-md transition duration-300"
                        onClick={handleCreateTask}
                    >
                        Create Task
                    </button>
                </div>
            </div>

            {/* Task List */}
            <div>
                <h3 className="text-xl font-semibold text-sky-950 mb-4">Task List</h3>
                <ul className="space-y-2">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex justify-between items-center text-lg text-gray-700 bg-white p-4 rounded-md shadow-md hover:shadow-lg transition"
                        >
                            <div>
                                <span>{task.title} - {task.description}</span>
                                <p className="text-xs text-gray-500">Completed: {task.completed ? "Yes" : "No"}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleUpdateTask(task.id, task.title, task.description, !task.completed)}
                                    className=" items-center mr-2 bg-sky-950 text-white shadow-md font-semibold hover:bg-sky-800"
                                >
                                    Toggle Completion
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="btn btn-error btn-sm border border-sky-300 hover:border-sky-950 shadow-md hover:shadow-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );



};


export default TaskPage;




