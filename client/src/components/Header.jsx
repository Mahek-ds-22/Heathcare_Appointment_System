import React from 'react';
export default function Header(){
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-500 text-white p-2 rounded"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21s8-4.5 8-10.5S15.5 3 12 7.5 4 3 4 10.5 12 21 12 21z" fill="currentColor"/></svg></div>
          <h1 className="text-lg font-bold">HealthCare Plus</h1>
        </div>
        <nav className="flex items-center gap-4">
          <button className="bg-brand-500 text-white px-4 py-2 rounded">Find Doctors</button>
          <a href="#appointments" className="px-3 py-2 border rounded">My Appointments</a>
        </nav>
      </div>
    </header>
  );
}
