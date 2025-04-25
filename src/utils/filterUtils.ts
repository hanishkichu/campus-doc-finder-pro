
import { Doctor } from '../types/doctor';

export function filterDoctorsByConsultationType(doctors: Doctor[], consultationType: string | null): Doctor[] {
  if (!consultationType) return doctors;
  
  return doctors.filter(doctor => 
    doctor.consultationType.some(type => 
      type.toLowerCase() === consultationType.toLowerCase()
    )
  );
}

export function filterDoctorsBySpecialties(doctors: Doctor[], selectedSpecialties: string[]): Doctor[] {
  if (!selectedSpecialties.length) return doctors;
  
  return doctors.filter(doctor => 
    doctor.specialty.some(specialty => 
      selectedSpecialties.includes(specialty)
    )
  );
}

export function sortDoctorsByFees(doctors: Doctor[]): Doctor[] {
  return [...doctors].sort((a, b) => a.fee - b.fee);
}

export function sortDoctorsByExperience(doctors: Doctor[]): Doctor[] {
  return [...doctors].sort((a, b) => b.experience - a.experience);
}

export function searchDoctorsByName(doctors: Doctor[], searchTerm: string): Doctor[] {
  if (!searchTerm.trim()) return doctors;
  
  const normalizedSearchTerm = searchTerm.toLowerCase();
  return doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(normalizedSearchTerm)
  );
}

export function getSuggestedDoctors(doctors: Doctor[], searchTerm: string): Doctor[] {
  if (!searchTerm.trim()) return [];
  
  const normalizedSearchTerm = searchTerm.toLowerCase();
  const matchingDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(normalizedSearchTerm)
  );
  
  return matchingDoctors.slice(0, 3);
}
