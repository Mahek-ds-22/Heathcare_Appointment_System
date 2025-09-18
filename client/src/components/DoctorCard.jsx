import React from 'react';
export default function DoctorCard({ doctor, onSelect }){
  return (
    <article className="bg-white p-4 rounded shadow flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">DR</div>
      <div className="flex-1">
        <h4 className="font-semibold">{doctor.name}</h4>
        <div className="text-sm text-slate-500">{doctor.specialization} • {doctor.location}</div>
        <div className="text-sm text-yellow-600">★ {doctor.rating ?? '—'}</div>
      </div>
      <div>
        <button onClick={onSelect} className="bg-accent text-white px-4 py-2 rounded">Book</button>
      </div>
    </article>
  );
}
