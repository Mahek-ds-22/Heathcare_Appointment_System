import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Appointment } from '../../types';
import AppointmentCard from './AppointmentCard';

interface AppointmentSummaryProps {
  appointments: Appointment[];
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({ appointments }) => {
  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');
  
  const getNextAppointment = () => {
    if (upcomingAppointments.length === 0) return null;
    
    return upcomingAppointments.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })[0];
  };

  const nextAppointment = getNextAppointment();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
              <p className="text-sm text-gray-600">Upcoming Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedAppointments.length}</p>
              <p className="text-sm text-gray-600">Completed Visits</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {nextAppointment ? '1' : '0'}
              </p>
              <p className="text-sm text-gray-600">Next Appointment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Appointment Highlight */}
      {nextAppointment && (
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Next Appointment</h3>
          <AppointmentCard appointment={nextAppointment} />
        </div>
      )}

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments
              .sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.time}`);
                const dateB = new Date(`${b.date} ${b.time}`);
                return dateA.getTime() - dateB.getTime();
              })
              .map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Appointments</h3>
          <p className="text-gray-600">Ready to book your next appointment? Search for doctors to get started.</p>
        </div>
      )}

      {/* Past Appointments */}
      {completedAppointments.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Past Appointments</h2>
          <div className="space-y-4">
            {completedAppointments
              .sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.time}`);
                const dateB = new Date(`${b.date} ${b.time}`);
                return dateB.getTime() - dateA.getTime();
              })
              .map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentSummary;
