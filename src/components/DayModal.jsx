import React, { useState, useEffect } from 'react';
import TaskAssignment from './TaskAssignment';
import MealPlanner from './MealPlanner';
import AttendanceTracker from './AttendanceTracker';

function DayModal({ date, onClose, onSave, existingData, familyMembers }) {
  const [tasks, setTasks] = useState([]);
  const [lunch, setLunch] = useState({ dish: '', attendance: {} });
  const [dinner, setDinner] = useState({ dish: '', attendance: {} });

  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  useEffect(() => {
    if (existingData) {
      setTasks(existingData.tasks || []);
      setLunch(existingData.lunch || { dish: '', attendance: {} });
      setDinner(existingData.dinner || { dish: '', attendance: {} });
    } else {
      // Inicializar asistencia para cada miembro de la familia
      const initialAttendance = {};
      familyMembers.forEach(member => {
        initialAttendance[member] = true;
      });
      
      setLunch({ dish: '', attendance: initialAttendance });
      setDinner({ dish: '', attendance: initialAttendance });
    }
  }, [existingData, familyMembers]);

  const handleSave = () => {
    onSave(date, {
      tasks,
      lunch,
      dinner
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-purple-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {dayNames[date.getDay()]} {date.getDate()} de {monthNames[date.getMonth()]} de {date.getFullYear()}
          </h2>
          <button 
            onClick={onClose}
            className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TaskAssignment 
              tasks={tasks} 
              setTasks={setTasks} 
              familyMembers={familyMembers} 
            />
          </div>
          
          <div className="space-y-6">
            <MealPlanner 
              title="Comida"
              meal={lunch}
              setMeal={setLunch}
            />
            
            <MealPlanner 
              title="Cena"
              meal={dinner}
              setMeal={setDinner}
            />
            
            <AttendanceTracker 
              lunch={lunch}
              setLunch={setLunch}
              dinner={dinner}
              setDinner={setDinner}
              familyMembers={familyMembers}
            />
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayModal;
