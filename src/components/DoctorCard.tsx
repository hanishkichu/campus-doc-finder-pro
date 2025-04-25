
import React from 'react';
import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card" 
      className="bg-white rounded-lg shadow-sm p-5 mb-4 border border-gray-100"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Doctor image */}
        <div className="flex-shrink-0">
          <img 
            src={doctor.profilePic || "/placeholder.svg"} 
            alt={doctor.name} 
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        
        {/* Doctor information */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 data-testid="doctor-name" className="text-lg font-semibold text-doctorBlue">
                {doctor.name}
              </h2>
              <p data-testid="doctor-specialty" className="text-gray-600 mb-1">
                {doctor.specialty && doctor.specialty.length > 0 ? doctor.specialty.join(', ') : 'General'}
              </p>
              <p className="text-gray-500 mb-1">{doctor.qualification}</p>
              <p data-testid="doctor-experience" className="text-gray-500 mb-2">
                {doctor.experience} yrs exp.
              </p>
              
              <div className="flex flex-col space-y-1 mt-2">
                <div className="flex items-center text-sm">
                  <span className="mr-2">🏥</span>
                  <span>{doctor.clinic}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="mr-2">📍</span>
                  <span>{doctor.location}</span>
                </div>
              </div>
            </div>
            
            {/* Fee and appointment */}
            <div className="mt-4 md:mt-0 md:text-right">
              <p data-testid="doctor-fee" className="text-lg font-bold">
                ₹ {doctor.fee}
              </p>
              
              <button className="mt-4 bg-doctorBlue hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
