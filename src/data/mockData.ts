import { Doctor, Appointment } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialization: 'Cardiology',
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    experience: 12,
    availableSlots: [
      { id: '1a', date: '2025-01-15', time: '09:00', available: true },
      { id: '1b', date: '2025-01-15', time: '10:30', available: true },
      { id: '1c', date: '2025-01-16', time: '14:00', available: true },
      { id: '1d', date: '2025-01-17', time: '11:00', available: true },
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    specialization: 'Dermatology',
    location: 'Los Angeles, CA',
    image: 'https://images.pexels.com/photos/6128069/pexels-photo-6128069.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    experience: 8,
    availableSlots: [
      { id: '2a', date: '2025-01-15', time: '11:00', available: true },
      { id: '2b', date: '2025-01-16', time: '09:30', available: true },
      { id: '2c', date: '2025-01-16', time: '15:00', available: true },
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Johnson',
    specialization: 'Pediatrics',
    location: 'Chicago, IL',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    experience: 15,
    availableSlots: [
      { id: '3a', date: '2025-01-15', time: '13:00', available: true },
      { id: '3b', date: '2025-01-17', time: '10:00', available: true },
      { id: '3c', date: '2025-01-18', time: '16:00', available: true },
    ]
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    location: 'Houston, TX',
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    experience: 20,
    availableSlots: [
      { id: '4a', date: '2025-01-16', time: '08:00', available: true },
      { id: '4b', date: '2025-01-17', time: '14:30', available: true },
      { id: '4c', date: '2025-01-18', time: '11:30', available: true },
    ]
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Neurology',
    location: 'Boston, MA',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    experience: 18,
    availableSlots: [
      { id: '5a', date: '2025-01-15', time: '15:00', available: true },
      { id: '5b', date: '2025-01-16', time: '12:00', available: true },
      { id: '5c', date: '2025-01-18', time: '09:00', available: true },
    ]
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialization: 'Internal Medicine',
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    experience: 10,
    availableSlots: [
      { id: '6a', date: '2025-01-15', time: '16:00', available: true },
      { id: '6b', date: '2025-01-17', time: '13:30', available: true },
      { id: '6c', date: '2025-01-19', time: '10:30', available: true },
    ]
  },
  {
    id: '7',
    name: 'Dr. Maria Garcia',
    specialization: 'Gynecology',
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    experience: 14,
    availableSlots: [
      { id: '7a', date: '2025-01-16', time: '11:00', available: true },
      { id: '7b', date: '2025-01-18', time: '14:00', available: true },
      { id: '7c', date: '2025-01-19', time: '15:30', available: true },
    ]
  },
  {
    id: '8',
    name: 'Dr. David Lee',
    specialization: 'Psychiatry',
    location: 'Denver, CO',
    image: 'https://images.pexels.com/photos/5407764/pexels-photo-5407764.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    experience: 16,
    availableSlots: [
      { id: '8a', date: '2025-01-15', time: '12:00', available: true },
      { id: '8b', date: '2025-01-17', time: '15:00', available: true },
      { id: '8c', date: '2025-01-18', time: '13:00', available: true },
    ]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Chen',
    specialization: 'Cardiology',
    date: '2025-01-20',
    time: '10:00',
    status: 'upcoming',
    location: 'New York, NY'
  },
  {
    id: '2',
    doctorId: '3',
    doctorName: 'Dr. Emily Johnson',
    specialization: 'Pediatrics',
    date: '2025-01-25',
    time: '14:30',
    status: 'upcoming',
    location: 'Chicago, IL'
  },
  {
    id: '3',
    doctorId: '2',
    doctorName: 'Dr. Michael Rodriguez',
    specialization: 'Dermatology',
    date: '2024-12-15',
    time: '11:00',
    status: 'completed',
    location: 'Los Angeles, CA'
  }
];

export const specializations = [
  'All Specializations',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Internal Medicine',
  'Gynecology',
  'Psychiatry',
  'Ophthalmology'
];

export const locations = [
  'All Locations',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Boston, MA',
  'Miami, FL',
  'Seattle, WA',
  'Denver, CO'
];
