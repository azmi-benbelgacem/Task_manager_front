// import axios from 'axios';
//
// // Configuration de base
// const API_BASE_URL = 'http://localhost:3001/api';
//
// // Récupérer tous les projets
// export const fetchProjects = async () => {
//     const response = await axios.get(`${API_BASE_URL}/projects`);
//     return response.data;
// };
//
// // Ajouter un nouveau projet
// export const createProject = async (name, description) => {
//     const response = await axios.post(`${API_BASE_URL}/projects`, { name, description });
//     return response.data;
// };
//
// // Mettre à jour un projet
// export const updateProject = async (projectId, updatedData) => {
//     const response = await axios.put(`${API_BASE_URL}/projects/${projectId}`, updatedData);
//     return response.data;
// };
//
// // Supprimer un projet
// export const deleteProject = async (projectId) => {
//     const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}`);
//     return response.data;
// };
//
// // Ajouter une tâche à un projet
// export const createTask = async (projectId, taskData) => {
//     const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/tasks`, taskData);
//     return response.data;
// };
//
// // Mettre à jour une tâche
// export const updateTask = async (projectId, taskId, updatedData) => {
//     const response = await axios.put(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`, updatedData);
//     return response.data;
// };
//
// // Supprimer une tâche
// export const deleteTask = async (projectId, taskId) => {
//     const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`);
//     return response.data;
// };
//
// // Basculer l'état d'une tâche
// export const toggleTaskCompletion = async (projectId, taskId) => {
//     const response = await axios.patch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/toggle-completion`);
//     return response.data;
// };





import axios from 'axios';

const apiUrl = 'http://localhost:3001/api'; // Your Flask API URL

// User APIs
export const createUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${apiUrl}/users`, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/users`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getUserByUsername = async (username) => {
    try {
        const response = await axios.get(`${apiUrl}/users/username/${username}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Update user
export const updateUser = async (id, updatedData) => {
    try {
        const response = await axios.put(`${apiUrl}/users/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Delete user
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Task APIs
export const createTask = async (title, description, user_id, project_id) => {
    try {
        const response = await axios.post(`${apiUrl}/tasks`, {
            title,
            description,
            user_id,
            project_id,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getTasks = async () => {
    try {
        const response = await axios.get(`${apiUrl}/tasks`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getTaskByTitle = async (title) => {
    try {
        const response = await axios.get(`${apiUrl}/tasks/title/${title}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const updateTask = async (id, title, description, completed) => {
    try {
        const response = await axios.put(`${apiUrl}/tasks/${id}`, {
            title,
            description,
            completed,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Project APIs
export const createProject = async (name, description) => {
    try {
        const response = await axios.post(`${apiUrl}/projects`, {
            name,
            description,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getProjects = async () => {
    try {
        const response = await axios.get(`${apiUrl}/projects`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getProjectByName = async (name) => {
    try {
        const response = await axios.get(`${apiUrl}/projects/name/${name}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const updateProject = async (id, name, description) => {
    try {
        const response = await axios.put(`${apiUrl}/projects/${id}`, {
            name,
            description,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const deleteProject = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/projects/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// Task completion toggle API
export const toggleTaskCompletion = async (project_id, task_id) => {
    try {
        const response = await axios.patch(`${apiUrl}/projects/${project_id}/tasks/${task_id}/toggle-completion`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
