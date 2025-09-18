export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
  image: string;
  rating: number;
  experience: number;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
}

export interface BookingFormData {
  doctorId: string;
  slotId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  symptoms: string;
  insuranceProvider: string;
}
