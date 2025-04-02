import React from 'react';

function AttendanceTracker({ lunch, setLunch, dinner, setDinner, familyMembers }) {
  const toggleAttendance = (mealType, member, isAttending) => {
    if (mealType === 'lunch') {
      setLunch({
        ...lunch,
        attendance: {
          ...lunch.attendance,
          [member]: isAttending
        }
      });
    } else {
      setDinner({
        ...dinner,
        attendance: {
          ...dinner.attendance,
          [member]: isAttending
        }
      });
    }
  };

  return (
    <div className="bg-green-50 rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold text-green-800 mb-4">Asistencia a las comidas</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2">Persona</th>
              <th className="text-center p-2">Comida</th>
              <th className="text-center p-2">Cena</th>
            </tr>
          </thead>
          <tbody>
            {familyMembers.map(member => (
              <tr key={member} className="border-t border-green-200">
                <td className="p-2 font-medium">{member}</td>
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={lunch.attendance[member] || false}
                    onChange={(e) => toggleAttendance('lunch', member, e.target.checked)}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                </td>
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={dinner.attendance[member] || false}
                    onChange={(e) => toggleAttendance('dinner', member, e.target.checked)}
                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTracker;
