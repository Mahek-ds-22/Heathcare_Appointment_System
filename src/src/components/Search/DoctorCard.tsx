import React from 'react';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  const availableSlots = doctor.availableSlots.filter(slot => slot.available).length;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100">
      <div className="flex items-start space-x-4">
        <img
          src={doctor.image}
          alt={`Portrait of ${doctor.name}`}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {doctor.name}
              </h3>
              <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" aria-hidden="true" />
                  <span>{doctor.rating}</span>
                  <span className="sr-only">out of 5 stars</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" aria-hidden="true" />
                  <span>{doctor.location}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-400" aria-hidden="true" />
                  <span>{doctor.experience} years experience</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-4 h-4 text-green-500" aria-hidden="true" />
                <span className="text-sm text-green-600 font-medium">
                  {availableSlots} available slots this week
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onBookAppointment(doctor)}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            aria-describedby={`book-${doctor.id}-help`}
          >
            Book Appointment
          </button>
          <p id={`book-${doctor.id}-help`} className="sr-only">
            Book an appointment with {doctor.name}, {doctor.specialization} specialist
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
