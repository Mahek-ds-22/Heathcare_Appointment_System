import React from 'react';
import { Clock } from 'lucide-react';
import { Doctor, TimeSlot } from '../../types';

interface CalendarProps {
  doctor: Doctor;
  selectedSlot: TimeSlot | null;
  onSlotSelect: (slot: TimeSlot) => void;
}

const Calendar: React.FC<CalendarProps> = ({ doctor, selectedSlot, onSlotSelect }) => {
  const availableSlots = doctor.availableSlots.filter(slot => slot.available);
  
  // Group slots by date
  const slotsByDate = availableSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-5 h-5 text-blue-600" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-gray-900">Available Appointments</h3>
      </div>

      <div className="space-y-6">
        {Object.entries(slotsByDate).map(([date, slots]) => (
          <div key={date}>
            <h4 className="text-md font-medium text-gray-900 mb-3">
              {formatDate(date)}
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => onSlotSelect(slot)}
                  className={`p-3 text-sm font-medium rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    selectedSlot?.id === slot.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                  aria-pressed={selectedSlot?.id === slot.id}
                  aria-describedby={`slot-${slot.id}-help`}
                >
                  {formatTime(slot.time)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {availableSlots.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-hidden="true" />
          <p className="text-gray-500">No available appointments for this doctor.</p>
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {selectedSlot && `Selected appointment: ${formatDate(selectedSlot.date)} at ${formatTime(selectedSlot.time)}`}
      </div>
    </div>
  );
};

export default Calendar;
