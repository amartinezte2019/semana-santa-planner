import React, { useState } from 'react';
import Calendar from './components/Calendar';
import DayModal from './components/DayModal';
import useLocalStorage from './hooks/useLocalStorage';
import './styles.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Usar useLocalStorage en lugar de useState para los datos de eventos
  const [eventData, setEventData] = useLocalStorage('semana-santa-events', {});

  // Rango de fechas para Semana Santa
  const startDate = new Date(2025, 3, 9); // 9 de abril de 2025
  const endDate = new Date(2025, 3, 23);  // 23 de abril de 2025

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveData = (date, data) => {
    // Esto guardará automáticamente en localStorage gracias al hook
    setEventData({
      ...eventData,
      [date.toISOString().split('T')[0]]: data
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <header className="bg-purple-600 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Planificador Familiar - Semana Santa 2025</h1>
      </header>
      
      <main className="container mx-auto p-4">
        <Calendar 
          onDateClick={handleDateClick} 
          eventData={eventData}
          startDate={startDate}
          endDate={endDate}
        />
        
        {showModal && selectedDate && (
          <DayModal 
            date={selectedDate}
            onClose={handleCloseModal}
            onSave={handleSaveData}
            existingData={eventData[selectedDate.toISOString().split('T')[0]]}
            familyMembers={['Abuelo', 'Abuela', 'Marcos', 'Lucas', 'Álvaro']}
          />
        )}
      </main>
      
      <footer className="bg-purple-600 text-white p-4 text-center mt-8">
        Semana Santa 2025 | 9 de abril - 23 de abril
      </footer>
    </div>
  );
}

export default App;
