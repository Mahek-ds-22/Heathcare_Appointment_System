import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DoctorCard from './components/DoctorCard';
import SlotsPanel from './components/SlotsPanel';
import BookingForm from './components/BookingForm';
import Appointments from './components/Appointments';
import Dashboard from './components/Dashboard';
import API from './api';

export default function App(){
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(()=> { fetchDoctors(); fetchAppointments(); }, []);

  async function fetchDoctors(q){
    const res = await API.get('/doctors', { params: { q: q || '' }});
    setDoctors(res.data);
  }

  async function fetchAppointments(){
    const res = await API.get('/appointments');
    setAppointments(res.data);
  }

  function handleSearch(q){
    setQuery(q);
    fetchDoctors(q);
  }

  function handleBookSuccess(newAppt){
    setAppointments(prev=>[...prev,newAppt]);
    setSelectedDoctor(null);
    setSelectedSlot(null);
  }

  async function handleCancel(id){
    await API.delete(`/appointments/${id}`);
    setAppointments(prev=>prev.filter(a=>a.id!==id));
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            <SearchBar onSearch={handleSearch} />
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Available Doctors</h2>
              <div className="grid gap-4">
                {doctors.map(d=> <DoctorCard key={d.id} doctor={d} onSelect={()=> setSelectedDoctor(d)} />)}
              </div>
            </div>

            {selectedDoctor && (
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Book with {selectedDoctor.name}</h3>
                <SlotsPanel doctor={selectedDoctor} onSelectSlot={setSelectedSlot} />
                {selectedSlot && <BookingForm slot={selectedSlot} doctor={selectedDoctor} onSuccess={handleBookSuccess} />}
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <Dashboard appointments={appointments} />
            <Appointments appointments={appointments} onCancel={handleCancel} />
          </aside>
        </div>
      </main>
    </div>
  );
}
