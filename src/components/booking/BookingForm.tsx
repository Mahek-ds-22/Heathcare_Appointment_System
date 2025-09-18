import React, { useState } from 'react';
import { User, Mail, Phone, FileText, Shield, X } from 'lucide-react';
import { Doctor, TimeSlot, BookingFormData } from '../../types';

interface BookingFormProps {
  doctor: Doctor;
  selectedSlot: TimeSlot | null;
  onSubmit: (formData: BookingFormData) => void;
  onClose: () => void;
}

interface FormErrors {
  patientName?: string;
  patientEmail?: string;
  patientPhone?: string;
  symptoms?: string;
  insuranceProvider?: string;
  slot?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  doctor,
  selectedSlot,
  onSubmit,
  onClose
}) => {
  const [formData, setFormData] = useState<Omit<BookingFormData, 'doctorId' | 'slotId'>>({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    symptoms: '',
    insuranceProvider: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    } else if (formData.patientName.trim().length < 2) {
      newErrors.patientName = 'Patient name must be at least 2 characters';
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Please enter a valid email address';
    }

    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = 'Phone number is required';
    } else if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.patientPhone)) {
      newErrors.patientPhone = 'Please enter a valid phone number (XXX) XXX-XXXX';
    }

    if (!formData.symptoms.trim()) {
      newErrors.symptoms = 'Please describe your symptoms or reason for visit';
    } else if (formData.symptoms.trim().length < 10) {
      newErrors.symptoms = 'Please provide more details (at least 10 characters)';
    }

    if (!formData.insuranceProvider.trim()) {
      newErrors.insuranceProvider = 'Insurance provider is required';
    }

    if (!selectedSlot) {
      newErrors.slot = 'Please select an appointment slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      onSubmit({
        ...formData,
        doctorId: doctor.id,
        slotId: selectedSlot!.id
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, patientPhone: formatted }));
    
    // Clear error when user starts typing
    if (errors.patientPhone) {
      setErrors(prev => ({ ...prev, patientPhone: undefined }));
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const formatSlotDisplay = () => {
    if (!selectedSlot) return '';
    
    const date = new Date(selectedSlot.date);
    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    const [hours, minutes] = selectedSlot.time.split(':');
    const timeDate = new Date();
    timeDate.setHours(parseInt(hours), parseInt(minutes));
    const timeStr = timeDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return `${dateStr} at ${timeStr}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Book Appointment</h2>
            <p className="text-sm text-gray-600 mt-1">
              with {doctor.name} • {doctor.specialization}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close booking form"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Selected appointment display */}
          {selectedSlot && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900">Selected Appointment:</p>
              <p className="text-blue-700">{formatSlotDisplay()}</p>
            </div>
          )}

          {errors.slot && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg" role="alert">
              {errors.slot}
            </div>
          )}

          {/* Patient Name */}
          <div>
            <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
              <input
                id="patient-name"
                type="text"
                value={formData.patientName}
                onChange={handleInputChange('patientName')}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.patientName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter your full name"
                aria-describedby="patient-name-error"
                aria-invalid={!!errors.patientName}
              />
            </div>
            {errors.patientName && (
              <p id="patient-name-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.patientName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="patient-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
              <input
                id="patient-email"
                type="email"
                value={formData.patientEmail}
                onChange={handleInputChange('patientEmail')}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.patientEmail ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="your.email@example.com"
                aria-describedby="patient-email-error"
                aria-invalid={!!errors.patientEmail}
              />
            </div>
            {errors.patientEmail && (
              <p id="patient-email-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.patientEmail}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="patient-phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
              <input
                id="patient-phone"
                type="tel"
                value={formData.patientPhone}
                onChange={handlePhoneChange}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.patientPhone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="(555) 123-4567"
                aria-describedby="patient-phone-error"
                aria-invalid={!!errors.patientPhone}
              />
            </div>
            {errors.patientPhone && (
              <p id="patient-phone-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.patientPhone}
              </p>
            )}
          </div>

          {/* Insurance */}
          <div>
            <label htmlFor="insurance-provider" className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Provider *
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
              <input
                id="insurance-provider"
                type="text"
                value={formData.insuranceProvider}
                onChange={handleInputChange('insuranceProvider')}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.insuranceProvider ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="e.g., Blue Cross Blue Shield"
                aria-describedby="insurance-provider-error"
                aria-invalid={!!errors.insuranceProvider}
              />
            </div>
            {errors.insuranceProvider && (
              <p id="insurance-provider-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.insuranceProvider}
              </p>
            )}
          </div>

          {/* Symptoms */}
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Visit / Symptoms *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" aria-hidden="true" />
              <textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange('symptoms')}
                rows={4}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                  errors.symptoms ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Please describe your symptoms or the reason for your visit..."
                aria-describedby="symptoms-error"
                aria-invalid={!!errors.symptoms}
              />
            </div>
            {errors.symptoms && (
              <p id="symptoms-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.symptoms}
              </p>
            )}
          </div>

          {/* Submit buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
