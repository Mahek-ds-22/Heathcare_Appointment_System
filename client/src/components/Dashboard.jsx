import React from 'react';
export default function Dashboard({ appointments }){
  const upcoming = appointments.length;
  const next = appointments.length ? appointments[0] : null;
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded bg-blue-50 text-center">
          <div className="font-bold text-2xl">{upcoming}</div>
          <div className="text-sm">Upcoming</div>
        </div>
        <div className="p-3 rounded bg-green-50 text-center">
          <div className="font-bold text-2xl">--</div>
          <div className="text-sm">Completed</div>
        </div>
        <div className="p-3 rounded bg-yellow-50 text-center">
          <div className="font-bold text-2xl">{next ? 1 : 0}</div>
          <div className="text-sm">Next</div>
        </div>
      </div>
      {next && <div className="mt-4 p-3 border rounded bg-sky-50">
        <h4 className="font-semibold">Next Appointment</h4>
        <div className="text-sm">{next.doctor_name} — {new Date(next.slot).toLocaleString()}</div>
      </div>}
    </div>
  );
}
