import React, { useState } from 'react';

function TaskAssignment({ tasks, setTasks, familyMembers }) {
  const [newTask, setNewTask] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() && assignee) {
      setTasks([...tasks, { id: Date.now(), description: newTask, assignee }]);
      setNewTask('');
      setAssignee('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="bg-purple-50 rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold text-purple-800 mb-4">Tareas del día</h3>
      
      <div className="space-y-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm text-purple-700 mb-1">Descripción de la tarea</label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Ej: Pasear a la perra"
            className="border border-purple-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm text-purple-700 mb-1">Asignar a</label>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="border border-purple-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value="">Seleccionar persona</option>
            {familyMembers.map(member => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleAddTask}
          disabled={!newTask.trim() || !assignee}
          className="w-full bg-purple-600 text-white py-2 rounded-md shadow hover:bg-purple-700 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
        >
          Añadir Tarea
        </button>
      </div>
      
      <div className="mt-6">
        <h4 className="font-semibold text-purple-700 mb-2">Tareas programadas:</h4>
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic">No hay tareas programadas para este día</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id} className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm">
                <div>
                  <span className="font-medium">{task.description}</span>
                  <span className="ml-2 text-sm bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
                    {task.assignee}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TaskAssignment;
