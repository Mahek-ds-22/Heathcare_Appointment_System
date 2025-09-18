import React from 'react';
// For demo: convert doctor's id to simple generated slots. In real app you'd query availability.
export default function SlotsPanel({ doctor, onSelectSlot }){
  const today = new Date();
  const slots = [9,10,11,14,16].map(h => {
    const d = new Date(today);
    d.setHours(h,0,0,0);
    return d.toISOString();
  });
  return (
    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
      {slots.map(s=> (
        <button key={s} onClick={()=>onSelectSlot(s)} className="bg-gray-100 p-2 rounded text-sm">{new Date(s).toLocaleString([], { weekday:'short', hour:'2-digit', minute:'2-digit' })}</button>
      ))}
    </div>
  );
}
