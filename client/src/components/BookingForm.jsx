import React, { useState } from 'react';
import API from '../api';

export default function BookingForm({ slot, doctor, onSuccess }){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [reason,setReason]=useState('');
  const [error,setError]=useState('');

  async function submit(e){
    e.preventDefault();
    if(name.length<2) return setError('Please enter full name');
    try{
      const res = await API.post('/appointments',{
        doctor_id: doctor.id,
        patient_name: name,
        email,
        phone,
        reason,
        slot
      });
      onSuccess(res.data);
    }catch(err){
      setError(err?.response?.data?.message || 'Failed to book');
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 bg-slate-50 p-4 rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="border p-2 rounded" required />
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="border p-2 rounded" required />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="border p-2 rounded" required />
        <input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason (optional)" className="border p-2 rounded" />
      </div>
      {error && <div role="alert" className="text-red-600 mt-2">{error}</div>}
      <div className="mt-3 flex gap-3">
        <button type="submit" className="bg-brand-500 text-white px-4 py-2 rounded">Confirm Booking</button>
      </div>
    </form>
  );
}
