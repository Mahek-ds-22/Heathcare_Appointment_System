import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Appointment } from '../../types';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const isUpcoming = () => {
    const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);
    const now = new Date();
    return appointmentDate > now && appointment.status === 'upcoming';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <User className="w-5 h-5 text-blue-600" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
            <p className="text-blue-600 font-medium">{appointment.specialization}</p>
          </div>
        </div>
        
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(appointment.status)}`}
          aria-label={`Appointment status: ${appointment.status}`}
        >
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <span>{formatDate(appointment.date)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <span>{formatTime(appointment.time)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <span>{appointment.location}</span>
        </div>
      </div>

      {isUpcoming() && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
              Reschedule
            </button>
            <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
