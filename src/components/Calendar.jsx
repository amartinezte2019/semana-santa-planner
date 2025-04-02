import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

function Calendar({ onDateClick, eventData, startDate, endDate }) {
  // Convertir datos de eventos para FullCalendar
  const events = Object.entries(eventData).map(([dateStr, data]) => {
    return {
      title: `${data.tasks.length} tareas / ${data.lunch.dish}`,
      start: dateStr,
      backgroundColor: data.tasks.length > 0 ? '#8B5CF6' : '#D8B4FE',
      borderColor: '#7C3AED'
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-xl p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
        validRange={{
          start: startDate,
          end: endDate
        }}
        events={events}
        dateClick={(info) => onDateClick(new Date(info.dateStr))}
        height="auto"
        fixedWeekCount={false}
        showNonCurrentDates={false}
        dayMaxEvents={3}
        eventContent={(eventInfo) => {
          return (
            <div className="p-1 overflow-hidden text-sm">
              <div className="font-semibold truncate">{eventInfo.event.title}</div>
            </div>
          );
        }}
        dayCellClassNames={(arg) => {
          const today = new Date();
          const cellDate = arg.date;
          
          if (cellDate >= startDate && cellDate <= endDate) {
            return 'bg-purple-50 hover:bg-purple-100 cursor-pointer transition-colors';
          }
          return '';
        }}
      />
    </div>
  );
}

export default Calendar;
