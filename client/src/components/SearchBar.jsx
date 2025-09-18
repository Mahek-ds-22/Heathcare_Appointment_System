import React, { useState } from 'react';
export default function SearchBar({ onSearch }){
  const [q, setQ] = useState('');
  function submit(e){ e.preventDefault(); onSearch(q); }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-3">
      <input aria-label="Search doctors" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, specialization or location" className="border p-2 rounded flex-1"/>
      <button className="bg-brand-500 text-white px-4 py-2 rounded">Search</button>
    </form>
  );
}
