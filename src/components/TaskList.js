// import React, { useState, useEffect } from 'react';
// import { fetchTasks } from '../services/Api';
//
// const TaskList = () => {
//     const [tasks, setTasks] = useState([]);
//
//     useEffect(() => {
//         fetchTasks().then(response => setTasks(response.data));
//     }, []);
//
//     return (
//         <ul>
//             {tasks.map(task => (
//                 <li key={task.id}>{task.title}</li>
//             ))}
//         </ul>
//     );
// };
//
// export default TaskList;
