import React from 'react';
import { Search, MapPin, Stethoscope } from 'lucide-react';
import { specializations, locations } from '../../data/mockData';

interface SearchFiltersProps {
  searchTerm: string;
  selectedSpecialization: string;
  selectedLocation: string;
  onSearchChange: (term: string) => void;
  onSpecializationChange: (specialization: string) => void;
  onLocationChange: (location: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  selectedSpecialization,
  selectedLocation,
  onSearchChange,
  onSpecializationChange,
  onLocationChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Your Doctor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search by name */}
        <div className="relative">
          <label htmlFor="doctor-search" className="block text-sm font-medium text-gray-700 mb-2">
            Doctor Name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
            <input
              id="doctor-search"
              type="text"
              placeholder="Search by doctor name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              aria-describedby="search-help"
            />
          </div>
          <p id="search-help" className="sr-only">
            Enter the name of the doctor you're looking for
          </p>
        </div>

        {/* Specialization filter */}
        <div>
          <label htmlFor="specialization-select" className="block text-sm font-medium text-gray-700 mb-2">
            Specialization
          </label>
          <div className="relative">
            <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" aria-hidden="true" />
            <select
              id="specialization-select"
              value={selectedSpecialization}
              onChange={(e) => onSpecializationChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              aria-describedby="specialization-help"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          <p id="specialization-help" className="sr-only">
            Select a medical specialization to filter doctors
          </p>
        </div>

        {/* Location filter */}
        <div>
          <label htmlFor="location-select" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" aria-hidden="true" />
            <select
              id="location-select"
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              aria-describedby="location-help"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <p id="location-help" className="sr-only">
            Select a location to find doctors in your area
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
