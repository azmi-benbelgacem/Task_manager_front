import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Identifiants administrateur
    const adminCredentials = {
        email: "admin@example.com",
        password: "admin123",
    };

    // Gestion de la connexion
    const handleLogin = (e) => {
        e.preventDefault();

        if (email === adminCredentials.email && password === adminCredentials.password) {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/tasks"); // Redirige vers la page des tâches
        } else {
            alert("Adresse e-mail ou mot de passe incorrect !");
        }
    };

    // Navigation vers la liste des tâches assignées
    const handleViewAssignedTasks = () => {
        navigate("/assigned-tasks"); // Redirige vers la page des tâches assignées
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-100">
            <div className="bg-gradient-to-r from-sky-950 to-sky-600 w-full max-w-4xl p-16 rounded-lg shadow-lg flex">
                <div className="w-full lg:w-7/12 bg-white p-10 rounded-l-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-sky-950 text-center mb-6">
                        Admin Connection
                    </h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Adresse e-mail */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-sky-950"
                            >
                                e-mail Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-3 px-4 text-sky-950 placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>
                        {/* Mot de passe */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-sky-950"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mot de passe"
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm py-3 px-4 text-sky-950 placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>
                        {/* Boutons */}
                        <div className="flex flex-col space-y-4">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-sky-950 text-sky-100 font-medium rounded-md hover:bg-sky-700 transition duration-300"
                            >
                                Connect
                            </button>
                            <button
                                type="button"
                                onClick={handleViewAssignedTasks}
                                className="w-full py-3 px-4 bg-sky-600 text-sky-100 font-medium rounded-md hover:bg-sky-500 transition duration-300"
                            >
                                View TaskBoard
                            </button>
                        </div>
                    </form>
                </div>

                {/* Colonne droite avec le dégradé */}
                <div className="hidden lg:block lg:w-5/12 bg-gradient-to-r from-sky-950 to-sky-600 rounded-r-lg">
                    {/* Vous pouvez ajouter du texte ou une image ici si vous le souhaitez */}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
