import React, { useState } from 'react';
import Header from './components/Layout/Header';
import SearchFilters from './components/Search/SearchFilters';
import DoctorCard from './components/Search/DoctorCard';
import Calendar from './components/Booking/Calendar';
import BookingForm from './components/Booking/BookingForm';
import AppointmentSummary from './components/Appointments/AppointmentSummary';
import { doctors, mockAppointments } from './data/mockData';
import { Doctor, TimeSlot, BookingFormData, Appointment } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'All Specializations' || 
                                   doctor.specialization === selectedSpecialization;
    const matchesLocation = selectedLocation === 'All Locations' || 
                           doctor.location === selectedLocation;
    
    return matchesSearch && matchesSpecialization && matchesLocation;
  });

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (formData: BookingFormData) => {
    if (!selectedDoctor || !selectedSlot) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      date: selectedSlot.date,
      time: selectedSlot.time,
      status: 'upcoming',
      location: selectedDoctor.location
    };

    setAppointments(prev => [...prev, newAppointment]);
    setShowBookingForm(false);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    
    // Switch to appointments tab to show the new appointment
    setActiveTab('appointments');
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'search' && (
          <>
            <SearchFilters
              searchTerm={searchTerm}
              selectedSpecialization={selectedSpecialization}
              selectedLocation={selectedLocation}
              onSearchChange={setSearchTerm}
              onSpecializationChange={setSelectedSpecialization}
              onLocationChange={setSelectedLocation}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Doctors List */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Available Doctors ({filteredDoctors.length})
                </h2>
                
                <div className="space-y-4">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onBookAppointment={handleBookAppointment}
                    />
                  ))}
                </div>

                {filteredDoctors.length === 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <p className="text-gray-500">
                      No doctors found matching your criteria. Try adjusting your filters.
                    </p>
                  </div>
                )}
              </div>

              {/* Calendar */}
              <div>
                {selectedDoctor ? (
                  <Calendar
                    doctor={selectedDoctor}
                    selectedSlot={selectedSlot}
                    onSlotSelect={handleSlotSelect}
                  />
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <p className="text-gray-500">
                      Select a doctor to view available appointment slots.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'appointments' && (
          <AppointmentSummary appointments={appointments} />
        )}
      </main>

      {/* Booking Form Modal */}
      {showBookingForm && selectedDoctor && selectedSlot && (
        <BookingForm
          doctor={selectedDoctor}
          selectedSlot={selectedSlot}
          onSubmit={handleBookingSubmit}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
}

export default App;
