import React from 'react';
export default function Appointments({ appointments, onCancel }){
  return (
    <section id="appointments" className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Upcoming appointments</h3>
      {appointments.length === 0 ? <p className="text-sm text-slate-500">No upcoming appointments</p> :
        <ul className="space-y-3 mt-3">
          {appointments.map(a => (
            <li key={a.id} className="flex justify-between items-start bg-slate-50 p-3 rounded">
              <div>
                <div className="font-medium">{a.doctor_name}</div>
                <div className="text-sm text-slate-600">{new Date(a.slot).toLocaleString()}</div>
                <div className="text-sm text-slate-600">Patient: {a.patient_name}</div>
              </div>
              <div className="text-right">
                <button onClick={()=> onCancel(a.id)} className="text-sm text-red-600">Cancel</button>
              </div>
            </li>
          ))}
        </ul>
      }
    </section>
  );
}
